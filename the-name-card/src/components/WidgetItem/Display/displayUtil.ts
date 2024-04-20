import { WidgetType } from '../Items';
import { FaInstagram, FaLink } from 'react-icons/fa6';

export const displayIconMap: Record<number, React.FC> = {
	[WidgetType.Link]: FaLink,
	[WidgetType.Socials]: FaInstagram,
};
