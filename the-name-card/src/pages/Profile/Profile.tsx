import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { useProfile } from '@hooks/useProfile';

const Profile = () => {
	const { userEmail } = useParams();
	const { getProfile } = useProfile();
	const { data, isLoading } = useQuery({
		queryKey: ['fetchProfile'],
		queryFn: () => {
			return getProfile('email', userEmail || '');
		},
	});
	console.log(data);
	return <div>{isLoading ? 'Loading' : 'loaded'}</div>;
};

export { Profile };
