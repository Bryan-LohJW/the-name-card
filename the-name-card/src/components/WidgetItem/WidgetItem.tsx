import { Socials, Link, WidgetProp, WidgetType } from './Items';
import './WidgetItem.scss';

type WidgetComponentMap = {
	[WidgetType.Socials]: React.FC<WidgetProp>;
	[WidgetType.Link]: React.FC<WidgetProp>;
};

const widgetComponentMap: WidgetComponentMap = {
	[WidgetType.Socials]: Socials,
	[WidgetType.Link]: Link,
};

export const WidgetItem: React.FC<WidgetProp> = ({
	type,
	value,
	updateValue,
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
