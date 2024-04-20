import './DisplayItem.scss';

interface IconProp {
	className?: string;
}

interface DisplayItemProp {
	Icon: React.FC<IconProp>;
	text: string;
	ActionIcon?: React.FC<IconProp>;
	onClick?: () => void;
}
const DisplayItem: React.FC<DisplayItemProp> = ({
	Icon,
	text,
	ActionIcon,
	onClick,
}) => {
	return (
		<div className="display-item" onClick={onClick}>
			<div className="display-item__icon-wrap">
				<Icon className="display-item__icon" />
			</div>
			<div className="display-item__text-content">{text}</div>
			{ActionIcon && (
				<div className="display-item__action">
					<ActionIcon />
				</div>
			)}
		</div>
	);
};

export { DisplayItem };
