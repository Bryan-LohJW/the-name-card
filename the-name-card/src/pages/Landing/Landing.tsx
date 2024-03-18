import { Header, MainContent, Card, CardHolder, Footer } from '@components';
import './Landing.scss';

const Landing = () => {
	return (
		<div className="landing__margin">
			<Header />
			<MainContent />
			<CardHolder>
				<Card />
				<Card />
				<Card />
			</CardHolder>
			<Footer />
		</div>
	);
};

export { Landing };
