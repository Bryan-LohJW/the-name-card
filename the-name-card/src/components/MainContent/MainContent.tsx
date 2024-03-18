import standout from '@assets/svgs/undraw_stand_out_-1-oag.svg';
import { Section } from '@components';
import './MainContent.scss';

const MainContent = () => {
	return (
		<Section>
			<div className="landing__main-content">
				<div className="main-content__texts">
					<h1 className="texts__attention">
						Looking to make an unique impression?
					</h1>
					<p className="texts__description">
						The Name Card gives you a unique way of showing of your
						brand. Customize your profile with various features, and
						always keep your information up to date.
					</p>
					<div className="texts__actions">
						<div className="texts__action texts__action--main">
							Sign Up
						</div>
						<div className="texts__action texts__action--sub">
							View Our Demo
						</div>
					</div>
				</div>
				<div className="main-content__image-container">
					<img
						src={standout}
						alt="Man standing out"
						className="main-content__image"
					/>
				</div>
			</div>
		</Section>
	);
};

export { MainContent };
