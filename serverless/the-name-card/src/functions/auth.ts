import {
	APIGatewayAuthorizerResult,
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
	APIGatewayTokenAuthorizerEvent,
	APIGatewayTokenAuthorizerHandler,
	PolicyDocument,
} from 'aws-lambda';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import {
	AuthError,
	BaseError,
	HttpStatusCode,
	ProcessEnvironmentError,
	ValidationError,
} from 'src/errors/errors';

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
	event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
	try {
		console.log('Starting token authorization');

		if (!event.authorizationToken) throw new AuthError('Missing token');

		const decoded = validateToken(event.authorizationToken.substring(7));
		if (decoded === null) throw new AuthError('Invalid token');

		const policyDocument = generatePolicy('allow', event.methodArn);

		return {
			principalId: decoded.sub || 'user',
			policyDocument,
		};
	} catch (e: any) {
		console.error(e);
		if (e instanceof BaseError)
			throw new BaseError(e.name, e.httpCode, e.message, e.isOperational);
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

const validateToken = (token: string): any => {
	console.log('Starting token validation');
	try {
		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET)
			throw new ProcessEnvironmentError(
				'Error getting process environment: JWT_SECRET'
			);
		return jwt.verify(token, JWT_SECRET);
	} catch (e: any) {
		console.error(e);
		return null;
	}
};
