export const useSaveS3 = () => {
	const getPresigned = async (key: string, contentType: string) => {
		const response = await fetch(import.meta.env.VITE_GET_PRESIGNED_URL, {
			method: 'post',
			body: JSON.stringify({ key, contentType }),
		});
		const body = await response.json();
		if (!body.url) throw Error('unable to get url');
		return body.url;
	};
	const saveImage = async (image: File) => {
		const key = 'public/' + image.name.replace(/ /gm, '_');
		const newImage = new File([image], key, {
			type: image.type,
		});
		const presignedUrl = await getPresigned(newImage.name, newImage.type);
		const response = await fetch(presignedUrl, {
			method: 'PUT',
			body: newImage,
		});
		if (response.ok) return import.meta.env.VITE_DB_PREFIX + newImage.name;
		return '';
	};

	return { saveImage };
};
