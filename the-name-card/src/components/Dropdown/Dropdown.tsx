import { useState } from 'react';

import './Dropdown.scss';

interface DropdownProps {
	children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="edit-profile__dropdown">
			<div className="dropdown__button" onClick={toggleOpen}>
				+ Widget
			</div>
			<div className="dropdown__options">
				{isOpen && <div onClick={toggleOpen}>{children}</div>}
			</div>
		</div>
	);
};
