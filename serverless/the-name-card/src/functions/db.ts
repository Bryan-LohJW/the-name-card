import {
	APIGatewayProxyHandler,
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
} from 'aws-lambda';

import { BaseError, InternalError, ValidationError } from 'src/errors/errors';
import { Database } from 'src/db/Database';
import { User } from 'src/entity';
import { z } from 'zod';

const createUserBodySchema = z.object({
	name: z.string().min(1, 'Name must be included'),
	email: z.string().email('Invalid email'),
});

export const createUser: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const body = JSON.parse(event.body || '{}');
		try {
			createUserBodySchema.parse(body);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				throw new ValidationError(e.message);
			}
			throw new ValidationError('Bad request');
		}

		let result: User;
		try {
			const database = new Database();
			const dataSource = await database.getDataSource();
			const user = await dataSource.getRepository(User).create({
				name: 'bryan',
				email: 'asdf@emial.com',
			});
			result = await dataSource.getRepository(User).save(user);

			return {
				statusCode: 200,
				body: JSON.stringify({ message: 'Success', result }),
			};
		} catch (e) {
			console.log(e);
			throw new InternalError('Error while accessing database');
		}
	} catch (e) {
		console.log(e);
		if (e instanceof BaseError)
			return {
				statusCode: e.httpCode,
				body: JSON.stringify({ message: e.message }),
			};
		return {
			statusCode: 500,
			body: JSON.stringify({ message: 'Internal Server Error' }),
		};
	}
};
