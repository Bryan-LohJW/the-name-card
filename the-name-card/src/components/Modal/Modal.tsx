import React, { ReactNode } from 'react';

import './Modal.scss';

interface ModalProp {
	children: ReactNode;
	outsideClick?: () => void;
}

const Modal: React.FC<ModalProp> = ({ children, outsideClick }) => {
	return (
		<div className="modal" onClick={() => outsideClick && outsideClick()}>
			<div
				className="modal-content"
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				{children}
			</div>
		</div>
	);
};

export { Modal };
