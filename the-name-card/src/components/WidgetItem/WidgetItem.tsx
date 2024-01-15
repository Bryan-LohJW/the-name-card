import { Instagram, ItemProp, Socials, WidgetProp, WidgetType } from './Items';

type WidgetComponentMap = {
	[WidgetType.Instagram]: React.FC<ItemProp>;
	[WidgetType.Socials]: React.FC<ItemProp>;
};

const widgetComponentMap: WidgetComponentMap = {
	[WidgetType.Instagram]: (props: ItemProp) => <Instagram {...props} />,
	[WidgetType.Socials]: (props: ItemProp) => <Socials {...props} />,
};

export const WidgetItem = ({ type, value }: WidgetProp) => {
	const WidgetComponent = widgetComponentMap[type];
	return (
		<>
			<WidgetComponent value={value} />
		</>
	);
};
