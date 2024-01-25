export interface WidgetProp {
	id?: string;
	type: WidgetType;
	value: string;
	deleteWidget?: () => void;
	updateValue?: (value: string) => void;
}

export interface WidgetState {
	type: WidgetType;
	value?: string;
}

export enum WidgetType {
	Socials,
}
