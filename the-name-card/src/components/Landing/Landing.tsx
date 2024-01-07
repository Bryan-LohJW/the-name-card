import './Landing.scss';
import { Header, MainContent, Card, CardHolder } from '..';

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
		</>
	);
};

export default Landing;
