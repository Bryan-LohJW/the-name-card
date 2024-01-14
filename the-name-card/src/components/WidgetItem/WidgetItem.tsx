import { Instagram, ItemProp, WidgetProp, WidgetType } from './Items';

type WidgetComponentMap = {
	[WidgetType.Instagram]: React.FC<ItemProp>;
};

const widgetComponentMap: WidgetComponentMap = {
	[WidgetType.Instagram]: (props: ItemProp) => <Instagram {...props} />,
};

export const WidgetItem = ({ type, value }: WidgetProp) => {
	const WidgetComponent = widgetComponentMap[type];
	return (
		<>
			<WidgetComponent value={value} />
		</>
	);
};
