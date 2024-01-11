import imageUrl from './../../assets/svgs/undraw_portfolio_update_re_jqnp.svg';
import './Card.scss';

const details = {
	image: imageUrl,
	description: 'Hello this is a description to use for the card',
};

const Card = () => {
	return (
		<div className="card">
			<img src={`${details.image}`} className="image" />
			<div className="description">
				<p>{details.description}</p>
			</div>
			<div>View</div>
		</div>
	);
};

export { Card };
