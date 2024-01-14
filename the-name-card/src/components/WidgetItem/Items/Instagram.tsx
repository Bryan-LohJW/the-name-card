import { ItemProp } from '.';

export const Instagram: React.FC<ItemProp> = ({ value }) => {
	console.log(value);
	return <div>{value}</div>;
};
