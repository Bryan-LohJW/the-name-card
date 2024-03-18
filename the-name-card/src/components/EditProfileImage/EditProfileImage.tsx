import { ChangeEvent, useRef } from 'react';
import { IoPersonOutline } from 'react-icons/io5';

import './EditProfileImage.scss';

interface EditProfileImageProp {
	profilePicture: {
		url: string;
		file: File | null;
	} | null;
	setProfilePicture: React.Dispatch<
		React.SetStateAction<{
			url: string;
			file: File | null;
		} | null>
	>;
}

const EditProfileImage: React.FC<EditProfileImageProp> = ({
	profilePicture,
	setProfilePicture,
}) => {
	const profilePictureInputRef = useRef<HTMLInputElement>(null);
	const openProfileFileInput = () => {
		profilePictureInputRef.current?.click();
	};

	const handleProfileFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files === null) return;
		const files = event?.target?.files;
		if (files) {
			const file = files[0];
			const url = URL.createObjectURL(file);
			setProfilePicture({ url, file });
		}
	};
	return (
		<div className="edit-profile-image__wrapper">
			<div
				className="edit-profile-picture"
				onClick={openProfileFileInput}
			>
				{profilePicture ? (
					<img
						src={profilePicture.url}
						alt="profile picture"
						className="image"
					/>
				) : (
					<IoPersonOutline className="image" />
				)}

				<input
					type="file"
					name="profile picture"
					style={{ display: 'none' }}
					ref={profilePictureInputRef}
					accept="image/png, image/jpeg, image/jpg"
					onChange={handleProfileFileChange}
				/>
			</div>
		</div>
	);
};

export { EditProfileImage };
