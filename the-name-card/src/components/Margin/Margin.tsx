import { FC, PropsWithChildren, ReactNode } from 'react';

import './Margin.scss';

interface MarginProps {
	children: ReactNode | null;
}

const Margin: FC<PropsWithChildren<MarginProps>> = ({ children }) => {
	return (
		<div className="margins">
			<div className="content">{children}</div>
		</div>
	);
};

export { Margin };
