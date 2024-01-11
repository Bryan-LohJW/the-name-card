import React, { ReactNode } from 'react';

import './Section.scss';

interface SectionProps {
	children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
	return <div className="section">{children}</div>;
};

export { Section };
