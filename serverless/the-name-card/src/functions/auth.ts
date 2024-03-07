import {
	APIGatewayAuthorizerResult,
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
	APIGatewayTokenAuthorizerHandler,
	CustomAuthorizerEvent,
	PolicyDocument,
} from 'aws-lambda';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { verifyGoogleToken } from 'src/auth/googleAuth';
import {
	AuthError,
	BaseError,
	HttpStatusCode,
	InternalError,
	ProcessEnvironmentError,
	ValidationError,
} from 'src/errors/errors';
import { TokenPayload } from 'google-auth-library';
import { User } from 'src/entity';
import { UserRepository } from 'src/db/Repository/UserRepository';
import { QueryFailedError } from 'typeorm';

const signTokenBodySchema = z.object({
	secret: z.string(),
	user: z.string(),
	optionalVar: z.string().optional(),
});

export const signToken: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const body = JSON.parse(event.body || '{}');

		try {
			signTokenBodySchema.parse(body);
		} catch (e) {
			console.error(e);
			throw new ValidationError('Bad request');
		}
		const SECRET = process.env.SECRET;
		if (!SECRET)
			throw new ProcessEnvironmentError(
				'Error getting process environment: SECRET'
			);
		if (body.secret !== SECRET) throw new AuthError('Unauthorized');

		const oneHourFromNow = Math.floor(Date.now() / 1000) + 60 * 60;
		const payload = {
			user: body.user,
			exp: oneHourFromNow,
			...(body.optionalVar && { optional: body.optionalVar }),
		};
		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET)
			throw new ProcessEnvironmentError(
				'Error getting process environment: JWT_SECRET'
			);
		const token = jwt.sign(payload, JWT_SECRET);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Success', token }),
		};
	} catch (e) {
		console.error(e);
		if (e instanceof BaseError)
			return {
				statusCode: e.httpCode,
				body: JSON.stringify({ message: e.message }),
			};
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal server error' }),
		};
	}
};

export const authorize: APIGatewayTokenAuthorizerHandler = async (
	event: CustomAuthorizerEvent,
	context,
	callback
): Promise<APIGatewayAuthorizerResult> => {
	try {
		console.log('Starting token authorization');

		const token = event.headers?.authorization;

		if (!token) throw new AuthError('Missing token');

		let tokenPayload: TokenPayload;

		try {
			tokenPayload = await verifyGoogleToken(token.substring(6));
			console.log(tokenPayload);
		} catch (e) {
			console.log(e);
			throw new AuthError('Invalid token');
		}

		// @ts-ignore
		const policyDocument = generatePolicy('allow', event.routeArn);
		console.log('Authorization success');
		return {
			principalId: tokenPayload.sub || 'user',
			policyDocument,
		};
	} catch (e: any) {
		console.error(e);
		if (e instanceof BaseError) {
			callback(e.message);
			throw new BaseError(e.name, e.httpCode, e.message, e.isOperational);
		}
		throw new BaseError(
			'Internal server error',
			HttpStatusCode.INTERNAL_SERVER,
			'Internal server error',
			false
		);
	}
};

const generatePolicy = (effect: string, resource: string): PolicyDocument => {
	const policyDocument = {} as PolicyDocument;
	if (effect && resource) {
		policyDocument.Version = '2012-10-17';
		policyDocument.Statement = [];
		const statementOne: any = {};
		statementOne.Action = 'execute-api:Invoke';
		statementOne.Effect = effect;
		statementOne.Resource = resource;
		policyDocument.Statement[0] = statementOne;
	}
	return policyDocument;
};

const signInBodySchema = z.object({
	credential: z.string(),
});

export const signIn: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const requestBody = JSON.parse(event.body || '{}');
		try {
			signInBodySchema.parse(requestBody);
		} catch (e) {
			console.log(e);
			throw new ValidationError('Bad request');
		}
		const payload = await verifyGoogleToken(requestBody.credential);
		const user = new User();
		user.email = payload.email || '';
		user.name = payload.name || '';
		let savedUser: User;
		try {
			const userRepository = new UserRepository();
			savedUser = await userRepository.upsertUserByEmail(user);
		} catch (e) {
			throw new InternalError('Unable to save user');
		}
		return {
			statusCode: 200,
			body: JSON.stringify({ user: savedUser }),
		};
	} catch (e) {
		console.log(e);
		if (e instanceof BaseError) {
			return {
				statusCode: e.httpCode,
				body: JSON.stringify({ message: e.message }),
			};
		}
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal server error' }),
		};
	}
};
