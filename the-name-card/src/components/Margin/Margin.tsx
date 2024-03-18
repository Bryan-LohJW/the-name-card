import { ReactNode } from 'react';

import './Margin.scss';

interface MarginProps {
	children?: ReactNode;
}

const Margin = ({ children }: MarginProps) => {
	return (
		<div className="margin__margins">
			<div className="content">{children}</div>
		</div>
	);
};

export { Margin };
