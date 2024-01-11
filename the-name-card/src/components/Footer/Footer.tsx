import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

import './Footer.scss';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="terms-service">
				<p className="service-item">Privacy Policy</p>
				<p className="service-item">Terms of Service</p>
				<p className="service-item">Disclaimer</p>
			</div>
			<div className="line-break" />
			<div className="socials-wrapper">
				<p>&copy; 2024 TheNameCard. All rights reserved</p>
				<div className="socials">
					<FaGithub className="social" />
					<FaXTwitter className="social" />
					<FaInstagram className="social" />
				</div>
			</div>
		</footer>
	);
};

export { Footer };
