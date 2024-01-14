import OutsideClickHandler from 'react-outside-click-handler';
import { ChromePicker, ColorResult } from 'react-color';
import { IoMdArrowBack } from 'react-icons/io';
import {
	IoColorPaletteOutline,
	IoClose,
	IoPersonOutline,
} from 'react-icons/io5';
import { LuImagePlus } from 'react-icons/lu';

import './EditProfile.scss';
import { ChangeEvent, useRef, useState } from 'react';

export const EditProfile = () => {
	// banner stuff for future refactor
	const [bannerColor, setBannerColor] = useState<string>('#10A5F5');
	const [showColorPalette, setShowColorPalette] = useState(false);
	const [bannerImageUri, setBannerImageUri] = useState<string | null>(null);

	const bannerPictureInputRef = useRef<HTMLInputElement>(null);

	const onColorChange = (color: ColorResult) => {
		setBannerColor(color.hex);
		setBannerImageUri(null);
	};

	const toggleColorPalette = () => {
		setShowColorPalette((prev) => !prev);
	};

	const handleBannerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files === null) return;
		const files = event?.target?.files;
		if (files) {
			const file = files[0];
			const url = URL.createObjectURL(file);
			setBannerImageUri(url);
		}
	};

	const bannerStyle = { backgroundColor: bannerColor };

	// profile picture for future refactor
	const [profilePictureUri, setProfilePictureUri] = useState<string | null>(
		null
	);
	const profilePictureInputRef = useRef<HTMLInputElement>(null);

	const handleProfileFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files === null) return;
		const files = event?.target?.files;
		if (files) {
			const file = files[0];
			const url = URL.createObjectURL(file);
			setProfilePictureUri(url);
		}
	};

	const openProfileFileInput = () => {
		profilePictureInputRef.current?.click();
	};

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
				<div className="profile-builder">
					<div className="core-profile">
						<div className="banner" style={bannerStyle}>
							{bannerImageUri && (
								<img
									src={bannerImageUri}
									alt="banner-image"
									className="banner-image"
								/>
							)}
							<input
								type="file"
								name="banner picture"
								style={{ display: 'none' }}
								ref={bannerPictureInputRef}
								accept="image/png, image/jpeg, image/jpg"
								onChange={handleBannerFileChange}
							/>
							<div className="banner-setting">
								<LuImagePlus
									className="banner-icon"
									onClick={() =>
										bannerPictureInputRef.current?.click()
									}
								/>
								{!showColorPalette ? (
									<IoColorPaletteOutline
										className="banner-icon"
										onClick={toggleColorPalette}
									/>
								) : (
									<IoClose className="banner-icon" />
								)}
							</div>
							{showColorPalette && (
								<OutsideClickHandler
									onOutsideClick={toggleColorPalette}
								>
									<ChromePicker
										className="color-picker"
										color={bannerColor}
										onChange={onColorChange}
									/>
								</OutsideClickHandler>
							)}
						</div>
						<div
							className="profile-picture-wrapper"
							onClick={openProfileFileInput}
						>
							{profilePictureUri ? (
								<img
									src={profilePictureUri}
									alt="profile picture"
									className="profile-picture"
								/>
							) : (
								<IoPersonOutline className="profile-picture" />
							)}

							<input
								type="file"
								name="banner picture"
								style={{ display: 'none' }}
								ref={profilePictureInputRef}
								accept="image/png, image/jpeg, image/jpg"
								onChange={handleProfileFileChange}
							/>
						</div>
						<div className="core-info"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
