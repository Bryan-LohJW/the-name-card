import { FC, PropsWithChildren, ReactNode } from 'react';

import { Section } from '..';
import './CardHolder.scss';

interface CardHolderProps {
	children: ReactNode | ReactNode[];
}

const CardHolder: FC<PropsWithChildren<CardHolderProps>> = ({ children }) => {
	return (
		<Section>
			<div className="card-holder">{children}</div>
		</Section>
	);
};

export { CardHolder };
