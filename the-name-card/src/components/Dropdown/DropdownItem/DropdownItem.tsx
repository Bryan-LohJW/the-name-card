import './DropdownItem.scss';

interface DropdownItemProps {
	label: string;
	onClick: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
	label,
	onClick,
}) => {
	return (
		<div className="dropdown__item" onClick={onClick}>
			<p className="item__label">{label}</p>
		</div>
	);
};
