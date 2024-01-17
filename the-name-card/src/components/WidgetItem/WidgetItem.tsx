import { ItemProp, Socials, WidgetProp, WidgetType } from './Items';

type WidgetComponentMap = {
	[WidgetType.Socials]: React.FC<ItemProp>;
};

const widgetComponentMap: WidgetComponentMap = {
	[WidgetType.Socials]: (props: ItemProp) => <Socials />,
};

export const WidgetItem = ({ type, value }: WidgetProp) => {
	const WidgetComponent = widgetComponentMap[type];
	return (
		<>
			<WidgetComponent value={value} />
		</>
	);
};
