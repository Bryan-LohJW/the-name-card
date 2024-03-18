import { ReactNode } from 'react';

import './CardHolder.scss';

interface CardHolderProps {
	children?: ReactNode | ReactNode[];
}

const CardHolder = ({ children }: CardHolderProps) => {
	return (
		<div className="landing__card-holder">
			<div className="content">{children}</div>
		</div>
	);
};

export { CardHolder };
