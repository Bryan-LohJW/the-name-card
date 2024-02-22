import {
	APIGatewayProxyEvent,
	APIGatewayProxyHandler,
	APIGatewayProxyResult,
} from 'aws-lambda';
import S3 from 'aws-sdk/clients/s3';
import { z } from 'zod';
import { config } from 'dotenv';
config();
import { ValidationError } from 'src/errors/errors';

const s3 = new S3({
	apiVersion: '2006-03-01',
	signatureVersion: 'v4',
	accessKeyId: process.env.ACCESS_KEY_ID,
	secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const getPresignedUrlBodySchema = z.object({
	user: z.string(),
	key: z.string(),
	contentType: z.string(),
});

export const getPresignedUrl: APIGatewayProxyHandler = async (
	event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
	try {
		const body = JSON.parse(event.body || '{}');
		try {
			getPresignedUrlBodySchema.parse(body);
		} catch (e) {
			if (e instanceof Error) {
				throw new ValidationError(e.message);
			}
			throw new ValidationError('Bad request');
		}
		const key = body.key;
		const signedURLExpirySeconds = 60;
		const url = s3.getSignedUrl('putObject', {
			Bucket: process.env.BUCKET_NAME,
			Key: `${key}`,
			Expires: signedURLExpirySeconds,
			ContentType: body.contentType,
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ url }),
		};
	} catch (e) {
		console.log(e);
		return {
			statusCode: 500,
			body: JSON.stringify(e),
		};
	}
};
