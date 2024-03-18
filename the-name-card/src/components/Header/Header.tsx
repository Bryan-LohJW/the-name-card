import { useState } from 'react';
import { BsPersonVcardFill, BsList, BsXLg } from 'react-icons/bs';

import { LoginCard, Modal } from '@components';
import './Header.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const Header = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isLoginOpen, setLoginOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const toggleLogin = () => {
		setLoginOpen(!isLoginOpen);
	};

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const userName = useSelector((state: RootState) => state.auth.name) || '';

	return (
		<>
			<header className="landing__header">
				<h1 className="header__branding">
					<BsPersonVcardFill className="header__logo" />
					<p className="header__product-name">The Name Card</p>
				</h1>
				<div className="header__nav-desktop">
					{userName && (
						<p className="welcome-msg">Welcome{' ' + userName}</p>
					)}
					<ul className="menu-list">
						<li className="list-item">About</li>
						<li className="list-item">Try</li>
					</ul>
					{isAuthenticated ? (
						<div className="call-to-action">Profile</div>
					) : (
						<div className="call-to-action" onClick={toggleLogin}>
							Sign Up
						</div>
					)}
				</div>
				<div className="header__nav-mobile">
					<div className="header__hamburger" onClick={toggleMenu}>
						<BsList className="hamburger-logo" />
					</div>
					<nav
						className={`menu-content ${
							isMenuOpen ? 'open' : 'close'
						}`}
					>
						<div
							className="menu-content__close"
							onClick={toggleMenu}
						>
							<BsXLg className="close-logo" />
						</div>
						<h1 className="header__branding">
							<BsPersonVcardFill className="header__logo" />
							<p className="product-name">The Name Card</p>
						</h1>
						{userName && (
							<p className="menu-content__welcome-msg">
								Welcome{' ' + userName}
							</p>
						)}
						<ul className="menu-content__menu-list">
							<li className="list-item">About</li>
							<li className="list-item">Try</li>
						</ul>
						{isAuthenticated ? (
							<div className="call-to-action">Profile</div>
						) : (
							<div
								className="call-to-action"
								onClick={toggleLogin}
							>
								Sign Up
							</div>
						)}
					</nav>
				</div>
			</header>
			{isLoginOpen && (
				<Modal outsideClick={toggleLogin}>
					<LoginCard onSuccess={toggleLogin} />
				</Modal>
			)}
		</>
	);
};

export { Header };
