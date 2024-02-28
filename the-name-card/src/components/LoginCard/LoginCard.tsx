import './LoginCard.scss';

const LoginCard = () => {
	return (
		<div className="login-card">
			<div className="login-header">
				<p className="title">Create an account</p>
				<p className="description">Select your preferred provider</p>
			</div>
			<div className="body">
				<button>Login with google</button>
			</div>
		</div>
	);
};

export { LoginCard };
