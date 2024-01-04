import { useState } from 'react';
import './Header.scss';
import { BsPersonVcardFill, BsList, BsXLg } from 'react-icons/bs';

const Header = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	return (
		<header className="header">
			<h1 className="branding">
				<BsPersonVcardFill className="logo" />
				<p className="product-name">The Name Card</p>
			</h1>
			<div className="nav-desktop">
				<ul className="menu-list">
					<li className="list-item">About</li>
					<li className="list-item">Try</li>
					<li className="list-item">Sign Up</li>
				</ul>
				<div className="call-to-action">Sign Up</div>
			</div>
			<div className="nav-mobile">
				<div className="hamburger" onClick={toggleMenu}>
					<BsList className="logo" />
				</div>
				<nav
					className={`menu-content ${isMenuOpen ? 'open' : 'close'}`}
				>
					<div className="close" onClick={toggleMenu}>
						<BsXLg className="logo" />
					</div>
					<h1 className="branding">
						<BsPersonVcardFill className="logo" />
						<p className="product-name">The Name Card</p>
					</h1>
					<ul className="menu-list">
						<li className="list-item">About</li>
						<li className="list-item">Try</li>
						<li className="list-item">Sign Up</li>
					</ul>
					<div className="call-to-action">Sign Up</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
