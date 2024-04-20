import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IoPersonOutline } from 'react-icons/io5';
import { BsSaveFill } from 'react-icons/bs';
import { FaPhone, FaEnvelope, FaShare } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useProfile } from '@hooks/useProfile';
import './Profile.scss';
import {
	DisplayItem,
	LinkValues,
	SocialArray,
	SocialTypesMap,
	WidgetProp,
	WidgetType,
	displayIconMap,
} from '@components';
import { ReactNode, useEffect, useState } from 'react';

const Profile = () => {
	const { userEmail } = useParams();
	const { getProfile } = useProfile();
	const [widgetProps, setWidgetProps] = useState<WidgetProp[] | null>(null);
	const { data } = useQuery({
		queryKey: ['fetchProfile'],
		queryFn: () => {
			return getProfile('email', userEmail || '');
		},
	});

	useEffect(() => {
		try {
			const widgetProps: WidgetProp[] = JSON.parse(
				data?.widgetProps || ''
			);
			setWidgetProps(widgetProps);
		} catch (e) {
			console.log(e);
		}
	}, [data]);

	const generateDisplayItem: (prop: WidgetProp) => ReactNode = (prop) => {
		const type = prop.type;
		if (type == WidgetType.Link) {
			const icon = displayIconMap[prop.type];
			const values: LinkValues = JSON.parse(prop.value);
			const onClick = () => {
				console.log(values.link);
				window.open(values.link, '_blank')?.focus();
			};
			const ActionIcon: React.FC = FaExternalLinkAlt;

			return (
				<DisplayItem
					Icon={icon}
					text={values.description}
					onClick={onClick}
					ActionIcon={ActionIcon}
				/>
			);
		}
		if (type == WidgetType.Socials) {
			const values: SocialArray = JSON.parse(prop.value);
			const value = values[0];
			const icon = SocialTypesMap[value.social].icon;
			const url: string = SocialTypesMap[value.social].url + value.value;
			const onClick = () => {
				console.log(url);
				window.open(url, '_blank')?.focus();
			};
			const ActionIcon: React.FC = FaExternalLinkAlt;
			return (
				<DisplayItem
					Icon={icon}
					text={value.value}
					onClick={onClick}
					ActionIcon={ActionIcon}
				/>
			);
		}
	};

	return (
		<div className="profile-wrapper" onLoad={() => console.log('loaded')}>
			<div className="profile">
				<div
					className="banner"
					style={{
						backgroundColor: data?.bannerColor,
						...{ backgroundImage: `url(${data?.bannerImage})` },
					}}
				>
					<div className="profile-picture-wrapper-holder">
						{data?.profileImage ? (
							<img
								src={data?.profileImage || undefined}
								alt="Profile Picture"
								className="profile-picture-holder"
							/>
						) : (
							<IoPersonOutline
								className="profile-picture-holder"
								style={{
									margin: 'auto',
									height: '75%',
								}}
							/>
						)}
					</div>
				</div>
				<div className="core-profile">
					<div className="name">{data && data.profileName}</div>
					<div className="designation">
						{data && data.designation}
					</div>
					<div className="bio">{data && data.bio}</div>
				</div>
				<div className="actions">
					<div className="icon-wrap">
						<FaPhone className="icon" />
					</div>
					<div className="icon-wrap">
						<FaEnvelope className="icon" />
					</div>
					<div className="icon-wrap">
						<FaShare className="icon" />
					</div>
					<div className="icon-wrap">
						<BsSaveFill className="icon" />
					</div>
				</div>
				<div className="profile_widgets-display">
					{/* TODO: export this as a function */}
					{widgetProps?.map((prop) => generateDisplayItem(prop))}
				</div>
			</div>
		</div>
	);
};

export { Profile };
