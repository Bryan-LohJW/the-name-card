import React, { ReactNode } from 'react';

import './Modal.scss';

interface ModalProp {
	children: ReactNode;
}

const Modal: React.FC<ModalProp> = ({ children }) => {
	return (
		<div className="modal">
			<div className="modal-content">{children}</div>
		</div>
	);
};

export { Modal };
