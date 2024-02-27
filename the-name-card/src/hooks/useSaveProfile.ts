import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSaveProfile = () => {
	const mutationFn = (body: BodyInit) => {
		return axios.post(import.meta.env.VITE_SAVE_PROFILE_URL, body);
	};

	const mutation = useMutation({ mutationFn });
	return mutation;
};
