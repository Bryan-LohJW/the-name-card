import { IoClose } from 'react-icons/io5';

import { Socials, WidgetProp, WidgetType } from './Items';
import './WidgetItem.scss';

type WidgetComponentMap = {
	[WidgetType.Socials]: React.FC<WidgetProp>;
};

const widgetComponentMap: WidgetComponentMap = {
	[WidgetType.Socials]: Socials,
};

export const WidgetItem: React.FC<WidgetProp> = ({
	type,
	value,
	updateValue,
	deleteWidget,
}) => {
	const WidgetComponent = widgetComponentMap[type];
	return (
		<div className="widget-wrapper">
			<WidgetComponent
				type={type}
				value={value}
				updateValue={updateValue}
			/>
		</div>
	);
};
