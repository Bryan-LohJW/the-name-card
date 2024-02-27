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
		<div className="dropdown-item" onClick={onClick}>
			<p className="label">{label}</p>
		</div>
	);
};
