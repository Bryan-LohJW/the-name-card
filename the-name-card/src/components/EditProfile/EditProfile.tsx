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
import { useSaveS3 } from '../../hooks/useSaveS3';
import { useForm } from 'react-hook-form';

const SAMPLE_USER_ID = '2';

export const EditProfile = () => {
	// banner stuff for future refactor
	const [bannerColor, setBannerColor] = useState('#10A5F5');
	const [showColorPalette, setShowColorPalette] = useState(false);
	const [bannerImageUri, setBannerImageUri] = useState<{
		url: string;
		file: File | null;
	} | null>(null);
	const [widgetProperties, setWidgetProperties] = useState<WidgetProp[]>([]);
	const { saveImage } = useSaveS3();
	const { register, handleSubmit } = useForm();

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
			setBannerImageUri({ url, file });
		}
	};

	const bannerStyle = { backgroundColor: bannerColor };

	// profile picture for future refactor
	const [profilePictureUri, setProfilePictureUri] = useState<{
		url: string;
		file: File | null;
	} | null>(null);
	const profilePictureInputRef = useRef<HTMLInputElement>(null);

	const handleProfileFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files === null) return;
		const files = event?.target?.files;
		if (files) {
			const file = files[0];
			const url = URL.createObjectURL(file);
			setProfilePictureUri({ url, file });
		}
	};

	const openProfileFileInput = () => {
		profilePictureInputRef.current?.click();
	};

	const onSortEnd = (oldIndex: number, newIndex: number) => {
		setWidgetProperties((array) => arrayMove(array, oldIndex, newIndex));
	};

	const generateSetWidgetProperties = (
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

	const submitProfile = async () => {
		// portion for turning all images / files into links
		const promises: Promise<string>[] = [];
		const imagesToSave: string[] = [];

		if (bannerImageUri?.file) {
			promises.push(saveImage(bannerImageUri.file));
			imagesToSave.push('banner');
		}
		if (profilePictureUri?.file) {
			promises.push(saveImage(profilePictureUri.file));
			imagesToSave.push('profile');
		}

		const values = await Promise.all(promises);

		const res: {
			banner: string | null;
			profile: string | null;
		} = {
			banner: bannerImageUri?.url || null,
			profile: profilePictureUri?.url || null,
		};
		imagesToSave.forEach((val, index) => {
			if (val === 'banner') {
				setBannerImageUri((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						url: values[index],
						file: null,
					};
				});
				res.banner = values[index];
			}
			if (val === 'profile') {
				setProfilePictureUri((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						url: values[index],
						file: null,
					};
				});
				res.profile = values[index];
			}
		});
		return res;
	};

	const onSubmit = handleSubmit(async (data) => {
		const imageUrl = await submitProfile();
		const requestBody = {
			userId: SAMPLE_USER_ID,
			profileImage: imageUrl.profile,
			bannerImage: imageUrl.banner,
			bannerColor: bannerColor,
			profileName: data.profileName,
			bio: data.bio,
			designation: data.designation,
			phone: data.phone,
			profileEmail: data.email,
			widgetProps: JSON.stringify(widgetProperties),
		};

		const response = await fetch(import.meta.env.VITE_SAVE_PROFILE_URL, {
			method: 'POST',
			body: JSON.stringify(requestBody),
		});

		const body = await response.json();
		console.log(body);
	});
	return (
		<>
			<form onSubmit={onSubmit}>
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
										src={bannerImageUri.url}
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
											src={profilePictureUri.url}
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
										{...register('profileName')}
									/>
								</div>
								<div className="core-input">
									<label className="label" htmlFor="bio">
										Bio{' '}
										<BiMessageDetail className="label-icon" />
									</label>
									<input
										className="input"
										id="bio"
										type="text"
										{...register('bio')}
									/>
								</div>
								<div className="core-input">
									<label
										className="label"
										htmlFor="designation"
									>
										Designation{' '}
										<MdOutlineWorkOutline className="label-icon" />
									</label>
									<input
										className="input"
										id="designation"
										type="text"
										{...register('designation')}
									/>
								</div>
								<div className="core-input">
									<label className="label" htmlFor="phone">
										Phone <MdPhone className="label-icon" />
									</label>
									<input
										className="input"
										id="phone"
										type="text"
										{...register('phone')}
									/>
								</div>
								<div className="core-input">
									<label className="label" htmlFor="email">
										Email{' '}
										<MdOutlineEmail className="label-icon" />
									</label>
									<input
										className="input"
										id="email"
										type="text"
										{...register('email')}
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
							onClick={generateSetWidgetProperties(
								WidgetType.Socials,
								WidgetInitialValue.Socials
							)}
						/>
						<DropdownItem
							label="Link"
							onClick={generateSetWidgetProperties(
								WidgetType.Link,
								WidgetInitialValue.Link
							)}
						/>
					</Dropdown>
					<button type="submit">SEND IT</button>
				</div>
			</form>
		</>
	);
};
