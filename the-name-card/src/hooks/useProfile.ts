export const useProfile = () => {
	type Profile = {
		userId: number;
		profileImage: string | null;
		bannerImage: string | null;
		bannerColor: string;
		profileName: string;
		bio: string;
		designation: string;
		phone: string;
		profileEmail: string;
		widgetProps: string;
	};

	const getProfile = async (type: 'email', identifier: string) => {
		if (type === 'email') {
			const response = await fetch(import.meta.env.VITE_GET_PROFILE_URL, {
				method: 'POST',
				body: JSON.stringify({ type, identifier }),
			});
			if (!response.ok) throw new Error('Unable to fetch profile');
			const body = (await response.json()) as Profile;
			return body;
		}
	};

	return { getProfile };
};
