import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IoPersonOutline } from 'react-icons/io5';
import { BsSaveFill } from 'react-icons/bs';
import { FaPhone, FaEnvelope, FaShare } from 'react-icons/fa6';

import { useProfile } from '@hooks/useProfile';
import './Profile.scss';

const Profile = () => {
	const { userEmail } = useParams();
	const { getProfile } = useProfile();
	const { data, isSuccess } = useQuery({
		queryKey: ['fetchProfile'],
		queryFn: () => {
			return getProfile('email', userEmail || '');
		},
	});

	console.log(data);
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
			</div>
		</div>
	);
};

export { Profile };
