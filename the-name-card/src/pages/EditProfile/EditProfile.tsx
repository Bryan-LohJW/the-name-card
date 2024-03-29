import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort';
import arrayMove from 'array-move';
import { useSelector } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';

import {
	Dropdown,
	DropdownItem,
	WidgetInitialValue,
	WidgetItem,
	WidgetProp,
	WidgetType,
	EditProfileBanner,
	EditProfileImage,
	EditProfileCore,
	Modal,
	LoginCard,
} from '@components';
import { useSaveS3 } from '@hooks/useSaveS3';
import { RootState } from '@store/store';
import './EditProfile.scss';

export const EditProfile = () => {
	const [showLogin, setShowLogin] = useState(false);
	// banner stuff for future refactor
	const [bannerColor, setBannerColor] = useState('#10A5F5');
	const [bannerImage, setBannerImage] = useState<{
		url: string;
		file: File | null;
	} | null>(null);
	const [widgetProperties, setWidgetProperties] = useState<WidgetProp[]>([]);

	// profile picture for future refactor
	const [profilePicture, setProfilePicture] = useState<{
		url: string;
		file: File | null;
	} | null>(null);

	const { saveImage } = useSaveS3();
	const methods = useForm();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const userEmail = useSelector((state: RootState) => state.auth.email);
	const googleToken = useSelector((state: RootState) => state.auth.token);

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

		if (bannerImage?.file) {
			promises.push(saveImage(bannerImage.file));
			imagesToSave.push('banner');
		}
		if (profilePicture?.file) {
			promises.push(saveImage(profilePicture.file));
			imagesToSave.push('profile');
		}

		const values = await Promise.all(promises);

		const res: {
			banner: string | null;
			profile: string | null;
		} = {
			banner: bannerImage?.url || null,
			profile: profilePicture?.url || null,
		};
		imagesToSave.forEach((val, index) => {
			if (val === 'banner') {
				setBannerImage((prev) => {
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
				setProfilePicture((prev) => {
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

	const onSubmit = methods.handleSubmit(async (data) => {
		if (!isAuthenticated) {
			setShowLogin(true);
			return;
		}

		const imageUrl = await submitProfile();
		const requestBody = {
			userEmail: userEmail,
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
			headers: {
				Authorization: 'Basic ' + googleToken,
			},
		});

		const body = await response.json();
		console.log(body);
	});
	return (
		<>
			<FormProvider {...methods}>
				<form onSubmit={onSubmit}>
					<div className="edit-profile__background"></div>
					<div className="edit-profile__editor">
						<div className="editor__header">
							<div className="header__back-action-wrapper">
								<IoMdArrowBack className="back-action" />
							</div>
							<p className="header__title">Edit Profile</p>
							<button
								type="submit"
								className="header__save-button"
							>
								Save
							</button>
						</div>
						<div className="editor__profile-builder">
							<div className="builder__core-profile">
								<EditProfileBanner
									bannerColor={bannerColor}
									setBannerColor={setBannerColor}
									bannerImage={bannerImage}
									setBannerImage={setBannerImage}
								/>
								<EditProfileImage
									profilePicture={profilePicture}
									setProfilePicture={setProfilePicture}
								/>
								<EditProfileCore />
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
											<div
												className="builder__widget"
												key={widget.id}
											>
												<WidgetItem
													type={widget.type}
													value={widget.value}
													updateValue={updateValue}
													deleteWidget={deleteWidget}
												/>
												<div
													className="widget__delete-button"
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
					</div>
				</form>
			</FormProvider>
			{showLogin && (
				<Modal>
					<LoginCard
						onSuccess={() => {
							setShowLogin(false);
						}}
					/>
				</Modal>
			)}
		</>
	);
};
