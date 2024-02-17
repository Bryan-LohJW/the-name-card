export const useFetch = (url: string, options?: RequestInit) => {
	const execute = async (body?: BodyInit) => {
		if (body && options) {
			options.body = body;
		}
		return await (await fetch(url, options && options)).json();
	};

	return execute;
};
