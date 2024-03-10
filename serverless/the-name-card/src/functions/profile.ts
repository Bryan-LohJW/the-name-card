import {
	APIGatewayProxyHandler,
	APIGatewayProxyEvent,
	APIGatewayProxyResult,
} from 'aws-lambda';
import { z } from 'zod';

import {
	BaseError,
	InternalError,
	NotFoundError,
	ValidationError,
} from 'src/errors/errors';
import { UserRepository } from 'src/db/Repository/UserRepository';
import { ProfileRepository } from 'src/db/Repository/ProfileRepository';
import { Profile } from 'src/entity';

const createProfileBodySchema = z.object({
	userEmail: z.string(),
	profileImage: z.string().nullable(),
	bannerImage: z.string().nullable(),
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
			const userRepository = new UserRepository();
			const profileRepository = new ProfileRepository();
			const userEmail = body.userEmail;
			const user = await userRepository.getUserByEmail(userEmail);
			if (!user) throw new NotFoundError('User not found');
			console.log('Successfully retrieved user');

			let profile = await user.profile;
			console.log('Profile: ' + profile);

			if (!profile) {
				profile = new Profile();
			}

			profile.profileName = body.profileName;
			profile.bio = body.bio;
			profile.designation = body.designation;
			profile.phone = body.phone;
			profile.profileEmail = body.profileEmail;
			profile.widgetProps = body.widgetProps;
			profile.profileImage = body.profileImage;
			profile.bannerImage = body.bannerImage;
			profile.bannerColor = body.bannerColor;
			console.log('Updated profile: ' + profile);

			const savedProfile = await profileRepository.saveProfile(profile);
			console.log('Saved profile');

			user.profile = Promise.resolve(savedProfile);
			await userRepository.saveUser(user);
			return {
				statusCode: 200,
				body: JSON.stringify({ message: 'Success', savedProfile }),
			};
		} catch (e) {
			console.log(e);
			throw new InternalError('Error while saving profile');
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
