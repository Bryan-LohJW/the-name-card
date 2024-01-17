import { ChangeEvent, useRef, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import OutsideClickHandler from 'react-outside-click-handler';
import { IoMdArrowBack } from 'react-icons/io';
import { FaRegAddressCard } from 'react-icons/fa';
import {
	IoColorPaletteOutline,
	IoClose,
	IoPersonOutline,
} from 'react-icons/io5';
import { LuImagePlus } from 'react-icons/lu';
import { BiMessageDetail } from 'react-icons/bi';
import { MdOutlineWorkOutline, MdOutlineEmail, MdPhone } from 'react-icons/md';

import { ItemProp, WidgetItem, WidgetType } from '..';
import './EditProfile.scss';

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

	const openBannerFileInput = () => {
		bannerPictureInputRef.current?.click();
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
		<>
			<div className="background"></div>
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
									onClick={openBannerFileInput}
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
						<div className="wrapper">
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
						</div>
						<div className="core-info">
							<div className="core-input">
								<label className="label" htmlFor="name">
									Name{' '}
									<FaRegAddressCard className="label-icon" />
								</label>
								<input
									className="input"
									id="name"
									type="text"
								/>
							</div>
							<div className="core-input">
								<label className="label" htmlFor="name">
									Bio{' '}
									<BiMessageDetail className="label-icon" />
								</label>
								<input
									className="input"
									id="name"
									type="text"
								/>
							</div>
							<div className="core-input">
								<label className="label" htmlFor="name">
									Designation{' '}
									<MdOutlineWorkOutline className="label-icon" />
								</label>
								<input
									className="input"
									id="name"
									type="text"
								/>
							</div>
							<div className="core-input">
								<label className="label" htmlFor="name">
									Phone <MdPhone className="label-icon" />
								</label>
								<input
									className="input"
									id="name"
									type="text"
								/>
							</div>
							<div className="core-input">
								<label className="label" htmlFor="name">
									Email{' '}
									<MdOutlineEmail className="label-icon" />
								</label>
								<input
									className="input"
									id="name"
									type="text"
								/>
							</div>
						</div>
					</div>
					<div className="widget">
						<WidgetItem type={WidgetType.Socials} />
					</div>
				</div>
				<div className="add-widget">+ Widget</div>
			</div>
		</>
	);
};
