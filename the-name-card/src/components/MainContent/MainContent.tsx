import standout from './../../assets/svgs/undraw_stand_out_-1-oag.svg';
import { Section } from '..';
import './MainContent.scss';

const MainContent = () => {
	return (
		<Section>
			<div className="main-content">
				<div className="texts">
					<h1 className="attention">
						Looking to make an unique impression?
					</h1>
					<p className="description">
						The Name Card gives you a unique way of showing of your
						brand. Customize your profile with various features, and
						always keep your information up to date.
					</p>
					<div className="actions">
						<div className="action main">Sign Up</div>
						<div className="action sub">View Our Demo</div>
					</div>
				</div>
				<div className="image-container">
					<img
						src={standout}
						alt="Man standing out"
						className="image"
					/>
				</div>
			</div>
		</Section>
	);
};

export { MainContent };
