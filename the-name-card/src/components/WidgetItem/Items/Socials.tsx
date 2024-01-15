import { z } from 'zod';
import { FaInstagram } from 'react-icons/fa';

import { ItemProp } from '.';

enum SocialMediaType {
	Instagram = 'instagram',
}

const SocialArray = z
	.object({ social: z.nativeEnum(SocialMediaType), value: z.string() })
	.array();

export type SocialArray = z.infer<typeof SocialArray>;

const SocialTypesMap = {
	instagram: { icon: <FaInstagram />, url: 'www.instagram.com/' },
};

export const Socials = ({ value }: ItemProp) => {
	const socialArray = SocialArray.parse(JSON.parse(value as string));

	return (
		<div>
			{socialArray.map((social, index) => {
				const socialType = SocialTypesMap[social.social];
				return (
					<div key={index}>
						{socialType.icon}
						{socialType.url}
						{social.value}
					</div>
				);
			})}
		</div>
	);
};
