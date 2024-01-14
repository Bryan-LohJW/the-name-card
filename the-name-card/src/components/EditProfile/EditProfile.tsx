import { IoMdArrowBack } from 'react-icons/io';

import './EditProfile.scss';

export const EditProfile = () => {
	return (
		<div className="background">
			<div className="editor">
				<div className="header">
					<div className="back-wrapper">
						<IoMdArrowBack className="back" />
					</div>
					<p className="title">Edit Profile</p>
					<div className="save-button">Save</div>
				</div>
				<div className="form">
					<div className="core-profile">Core-profile</div>
				</div>
			</div>
		</div>
	);
};
