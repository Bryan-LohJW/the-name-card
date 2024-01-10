import './Landing.scss';
import { Header, MainContent, Card, CardHolder, Footer } from '..';

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

export default Landing;
