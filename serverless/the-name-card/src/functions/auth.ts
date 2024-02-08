import {
	APIGatewayAuthorizerResult,
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
	APIGatewayTokenAuthorizerEvent,
	APIGatewayTokenAuthorizerHandler,
	AuthResponse,
	CustomAuthorizerCallback,
	CustomAuthorizerEvent,
	PolicyDocument,
	Statement,
} from 'aws-lambda';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { AuthError, ProcessEnvironmentError } from '@src/errors/errors';
config();

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
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Bad Request' }),
			};
		}
		const SECRET = process.env.SECRET;
		if (!SECRET) throw new ProcessEnvironmentError();
		if (body.secret !== SECRET)
			return {
				statusCode: 401,
				body: JSON.stringify({ message: 'Unauthorized' }),
			};

		const oneHourFromNow = Math.floor(Date.now() / 1000) + 60 * 60;
		const payload = {
			user: body.user,
			exp: oneHourFromNow,
			...(body.optionalVar && { optional: body.optionalVar }),
		};
		const JWT_SECRET = process.env.JWT_SECRET;
		if (!JWT_SECRET) throw Error;
		const token = jwt.sign(payload, JWT_SECRET);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Success', token }),
		};
	} catch (e) {
		console.error(e);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Unexpected Error' }),
		};
	}
};

export const authorize: APIGatewayTokenAuthorizerHandler = async (
	event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
	try {
		console.log('Starting token authorization');

		if (!event.authorizationToken) {
			throw new AuthError('Missing token');
		}

		const decoded = validateToken(event.authorizationToken.substring(7));
		if (decoded === null) throw new AuthError('Invalid token');

		const policyDocument = generatePolicy('allow', event.methodArn);

		return {
			principalId: decoded.sub || 'user',
			policyDocument,
		};
	} catch (e: any) {
		console.error('An error occurred during authorization', e);
		throw new AuthError('Unauthorized');
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
		if (!JWT_SECRET) throw new ProcessEnvironmentError();
		return jwt.verify(token, JWT_SECRET);
	} catch (e: any) {
		console.error(e);
		return null;
	}
};
