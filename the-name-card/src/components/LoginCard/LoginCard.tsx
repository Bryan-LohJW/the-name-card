import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import './LoginCard.scss';

const LoginCard = () => {
	return (
		<div className="login-card">
			<div className="login-header">
				<p className="title">Create an account</p>
				<p className="description">Select your preferred provider</p>
			</div>
			<div className="body">
				<GoogleLogin
					onSuccess={(credentialResponse: CredentialResponse) => {
						console.log(credentialResponse);
					}}
					onError={() => {
						console.log('Error logging in');
					}}
				/>
			</div>
		</div>
	);
};

export { LoginCard };
