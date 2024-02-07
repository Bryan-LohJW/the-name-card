import {
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

const bodySchema = z.object({
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
			bodySchema.parse(body);
		} catch (e) {
			console.log(e);
			return {
				statusCode: 400,
				body: JSON.stringify({ message: 'Bad Request' }),
			};
		}
		const SECRET = process.env.SECRET;
		if (!SECRET) throw Error;
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
		console.log(e);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Unexpected Error' }),
		};
	}
};
