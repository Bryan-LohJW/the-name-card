import {
	APIGatewayProxyHandler,
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { z } from 'zod';
import { DataSource } from 'typeorm';

import {
	BaseError,
	InternalError,
	NotFoundError,
	ValidationError,
} from 'src/errors/errors';
import { Database } from 'src/db/Database';
import { User } from 'src/entity';

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
			result = await dataSource.getRepository(User).save({
				name: body.name,
				email: body.email,
			});

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

const createProfileBodySchema = z.object({
	userId: z.string(),
	profileImage: z.string().optional(),
	bannerImage: z.string().optional(),
	bannerColor: z.string(),
	profileName: z.string().min(1, 'Name must be included'),
	bio: z.string().min(1, 'Bio must be included'),
	designation: z.string().min(1, 'Designation must be included'),
	phone: z.string().min(1, 'Phone number must be included'),
	profileEmail: z
		.string()
		.min(1, 'Email must be included')
		.email('Invalid email'),
	widgetProps: z.string().optional(),
});

export const createProfile: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const body = JSON.parse(event.body || '{}');
		try {
			createProfileBodySchema.parse(body);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				throw new ValidationError(e.message);
			}
			throw new ValidationError('Bad request');
		}
		try {
			const userId = body.userId;
			body.delete('userId');

			const database = new Database();
			const dataSource = await database.getDataSource();
			const savedProfile = await dataSource.manager.save(body);

			const user = await getUser(userId, dataSource);
			user.profile = savedProfile;
			await dataSource.manager.save(user);
			return {
				statusCode: 200,
				body: JSON.stringify({ message: 'Success', savedProfile }),
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

const getUser = async (userId: number, database: DataSource): Promise<User> => {
	const user = await database.getRepository(User).findOneBy({ id: userId });
	if (!user) throw new NotFoundError('User not found');
	return user;
};
