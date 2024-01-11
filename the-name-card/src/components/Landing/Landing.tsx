import { Header, MainContent, Card, CardHolder, Footer } from '..';
import './Landing.scss';

const Landing = () => {
	return (
		<>
			<Header />
			<MainContent />
			<CardHolder>
				<Card />
				<Card />
				<Card />
			</CardHolder>
			<Footer />
		</>
	);
};

export { Landing };
