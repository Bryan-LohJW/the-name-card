import { OAuth2Client, TokenPayload } from 'google-auth-library';

import { AuthError } from 'src/errors/errors';

export const verifyGoogleToken = async (
	token: string
): Promise<TokenPayload> => {
	const client = new OAuth2Client();

	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	const payload = ticket.getPayload();
	if (!payload) throw new AuthError('Undefined payload');
	return payload;
};
