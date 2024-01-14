export type ItemProp = {
	value?: string[] | string;
};

export interface WidgetProp {
	type: WidgetType;
	value?: string[] | string;
}

export enum WidgetType {
	Instagram,
}
