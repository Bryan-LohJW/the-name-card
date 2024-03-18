import { ChangeEvent, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { ChromePicker, ColorResult } from 'react-color';
import { LuImagePlus } from 'react-icons/lu';
import { IoColorPaletteOutline, IoClose } from 'react-icons/io5';

import './EditProfileBanner.scss';

interface EditProfileBannerProp {
	bannerColor: string;
	setBannerColor: React.Dispatch<React.SetStateAction<string>>;
	bannerImage: {
		url: string;
		file: File | null;
	} | null;
	setBannerImage: React.Dispatch<
		React.SetStateAction<{
			url: string;
			file: File | null;
		} | null>
	>;
}

const EditProfileBanner: React.FC<EditProfileBannerProp> = ({
	bannerColor,
	setBannerColor,
	bannerImage,
	setBannerImage,
}) => {
	const [showColorPalette, setShowColorPalette] = useState(false);
	const bannerStyle = { backgroundColor: bannerColor };

	const bannerPictureInputRef = useRef<HTMLInputElement>(null);

	const openBannerFileInput = () => {
		bannerPictureInputRef.current?.click();
	};

	const toggleColorPalette = () => {
		setShowColorPalette((prev) => !prev);
	};

	const onColorChange = (color: ColorResult) => {
		setBannerColor(color.hex);
		setBannerImage(null);
	};

	const handleBannerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files === null) return;
		const files = event?.target?.files;
		if (files) {
			const file = files[0];
			const url = URL.createObjectURL(file);
			setBannerImage({ url, file });
		}
	};
	return (
		<div className="edit-profile__banner" style={bannerStyle}>
			{bannerImage && (
				<img
					src={bannerImage.url}
					alt="banner image"
					className="banner__image"
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
			<div className="banner__setting">
				<LuImagePlus
					className="setting__icon"
					onClick={openBannerFileInput}
				/>
				{!showColorPalette ? (
					<IoColorPaletteOutline
						className="setting__icon"
						onClick={toggleColorPalette}
					/>
				) : (
					<IoClose className="setting__icon" />
				)}
			</div>
			{showColorPalette && (
				<OutsideClickHandler onOutsideClick={toggleColorPalette}>
					<ChromePicker
						className="banner__color-picker"
						color={bannerColor}
						onChange={onColorChange}
					/>
				</OutsideClickHandler>
			)}
		</div>
	);
};

export { EditProfileBanner };
