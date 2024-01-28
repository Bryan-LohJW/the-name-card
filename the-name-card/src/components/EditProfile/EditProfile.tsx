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
import {
	MdOutlineWorkOutline,
	MdOutlineEmail,
	MdPhone,
	MdDragIndicator,
} from 'react-icons/md';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort';
import arrayMove from 'array-move';

import {
	Dropdown,
	DropdownItem,
	WidgetInitialValue,
	WidgetItem,
	WidgetProp,
	WidgetType,
} from '..';
import './EditProfile.scss';

export const EditProfile = () => {
	// banner stuff for future refactor
	const [bannerColor, setBannerColor] = useState<string>('#10A5F5');
	const [showColorPalette, setShowColorPalette] = useState(false);
	const [bannerImageUri, setBannerImageUri] = useState<string | null>(null);
	const [widgetProperties, setWidgetProperties] = useState<WidgetProp[]>([]);

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

	const onSortEnd = (oldIndex: number, newIndex: number) => {
		setWidgetProperties((array) => arrayMove(array, oldIndex, newIndex));
	};

	const setWidgetPropertiesWrapper = (
		type: WidgetType,
		initalValue: string
	) => {
		return () =>
			setWidgetProperties((prev) => [
				...prev,
				{
					type: type,
					value: initalValue,
					id: crypto.randomUUID(),
				},
			]);
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
					<SortableList
						onSortEnd={onSortEnd}
						draggedItemClassName="highlight"
					>
						{widgetProperties.map((widget, index) => {
							const updateValue = (value: string) => {
								setWidgetProperties((prev) => {
									const updated = [...prev];
									updated[index] = {
										...updated[index],
										value,
									};
									return updated;
								});
							};

							const deleteWidget = () => {
								setWidgetProperties((prev) => {
									const updated = [...prev];
									updated.splice(index, 1);
									return updated;
								});
							};
							return (
								<SortableItem key={widget.id}>
									<div className="widget" key={widget.id}>
										<WidgetItem
											type={widget.type}
											value={widget.value}
											updateValue={updateValue}
											deleteWidget={deleteWidget}
										/>
										<div
											className="delete-button"
											onClick={deleteWidget}
										>
											<IoClose className="delete-icon" />
										</div>
										<SortableKnob>
											<div className="sortable-knob">
												<MdDragIndicator className="knob-icon" />
											</div>
										</SortableKnob>
									</div>
								</SortableItem>
							);
						})}
					</SortableList>
				</div>
				<Dropdown>
					<DropdownItem
						label="Socials"
						onClick={setWidgetPropertiesWrapper(
							WidgetType.Socials,
							WidgetInitialValue.Socials
						)}
					/>
					<DropdownItem
						label="Link"
						onClick={setWidgetPropertiesWrapper(
							WidgetType.Link,
							WidgetInitialValue.Link
						)}
					/>
				</Dropdown>
			</div>
		</>
	);
};
