import imageUrl from './../../assets/svgs/undraw_portfolio_update_re_jqnp.svg';
import './Card.scss';

const DUMMY_DETAILS = {
	image: imageUrl,
	description: 'Hello this is a description to use for the card',
};

const Card = () => {
	return (
		<div className="card">
			<img src={`${DUMMY_DETAILS.image}`} className="image" />
			<div className="description">
				<p>{DUMMY_DETAILS.description}</p>
			</div>
			<div>View</div>
		</div>
	);
};

export { Card };
