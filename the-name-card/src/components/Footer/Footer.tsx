import { FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

import './Footer.scss';

const Footer = () => {
	return (
		<footer className="landing__footer">
			<div className="footer__terms-service">
				<p className="service__item">Privacy Policy</p>
				<p className="service__item">Terms of Service</p>
				<p className="service__item">Disclaimer</p>
			</div>
			<div className="service__line-break" />
			<div className="service__socials-wrapper">
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
