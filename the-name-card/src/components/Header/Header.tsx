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
			<header className="header">
				<h1 className="branding">
					<BsPersonVcardFill className="logo" />
					<p className="product-name">The Name Card</p>
				</h1>
				<div className="nav-desktop">
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
				<div className="nav-mobile">
					<div className="hamburger" onClick={toggleMenu}>
						<BsList className="logo" />
					</div>
					<nav
						className={`menu-content ${
							isMenuOpen ? 'open' : 'close'
						}`}
					>
						<div className="close" onClick={toggleMenu}>
							<BsXLg className="logo" />
						</div>
						<h1 className="branding">
							<BsPersonVcardFill className="logo" />
							<p className="product-name">The Name Card</p>
						</h1>
						{userName && (
							<p className="welcome-msg">
								Welcome{' ' + userName}
							</p>
						)}
						<ul className="menu-list">
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
