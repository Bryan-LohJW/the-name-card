import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import { useLogin } from '@hooks/useLogin';
import './LoginCard.scss';

interface LoginCardProp {
	onSuccess: () => void;
}

const LoginCard: React.FC<LoginCardProp> = ({ onSuccess }) => {
	const login = useLogin();

	const googleOnSuccess = async (credentialResponse: CredentialResponse) => {
		try {
			await login('google', credentialResponse.credential || '');
			onSuccess();
		} catch (e) {
			console.log(e);
			// give an error message about login in
		}
	};

	return (
		<div className="login-card">
			<div className="login-header">
				<p className="title">Create an account</p>
				<p className="description">Select your preferred provider</p>
			</div>
			<div className="body">
				<GoogleLogin
					onSuccess={googleOnSuccess}
					onError={() => {
						console.log('Error logging in');
					}}
				/>
			</div>
		</div>
	);
};

export { LoginCard };
