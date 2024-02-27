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
		<div>
			<div className="add-widget" onClick={toggleOpen}>
				+ Widget
			</div>
			<div className="dropdown-options">
				{isOpen && <div onClick={toggleOpen}>{children}</div>}
			</div>
		</div>
	);
};
