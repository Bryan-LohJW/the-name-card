import { ReactNode } from 'react';

import { Section } from '@components';
import './CardHolder.scss';

interface CardHolderProps {
	children?: ReactNode | ReactNode[];
}

const CardHolder = ({ children }: CardHolderProps) => {
	return (
		<Section>
			<div className="card-holder">{children}</div>
		</Section>
	);
};

export { CardHolder };
