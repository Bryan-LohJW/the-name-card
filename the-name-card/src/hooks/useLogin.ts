import { useDispatch } from 'react-redux';

import {
	saveEmail,
	saveName,
	saveToken,
	setAuthenticated,
} from '@store/slice/authStore';

type LoginResponseBody = {
	user: {
		email: string;
		name: string;
		id: number;
	};
};

export const useLogin = () => {
	const dispatch = useDispatch();

	const login = async (provider: 'google', credential: string) => {
		let response = null;
		if (provider === 'google') {
			response = await fetch(
				import.meta.env.VITE_GOOGLE_LOGIN_BACKEND_URL,
				{
					method: 'POST',
					body: JSON.stringify({ credential }),
				}
			);
		}
		if (!response?.ok) throw new Error('Unable to login');

		const body: LoginResponseBody = await response?.json();
		if (!body) throw new Error('Unable to login');
		dispatch(saveToken(credential));
		dispatch(saveName(body.user.name));
		dispatch(saveEmail(body.user.email));
		dispatch(setAuthenticated(true));
	};

	return login;
};
