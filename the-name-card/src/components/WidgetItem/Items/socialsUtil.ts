import {
	FaInstagram,
	FaFacebook,
	FaXTwitter,
	FaLinkedin,
	FaYoutube,
	FaTiktok,
} from 'react-icons/fa6';

export enum SocialMediaType {
	Instagram = 'instagram',
	Facebook = 'facebook',
	Twitter = 'twitter',
	LinkedIn = 'linkedIn',
	Youtube = 'youtube',
	TikTok = 'tiktok',
}

interface IconProp {
	className?: string;
}

interface SocialMediaEntry {
	icon: React.FC<IconProp>;
	url: string;
}

type SocialTypesMap = Record<SocialMediaType, SocialMediaEntry>;

export const SocialTypesMap: SocialTypesMap = {
	[SocialMediaType.Instagram]: {
		icon: FaInstagram,
		url: 'https://www.instagram.com/',
	},
	[SocialMediaType.Facebook]: {
		icon: FaFacebook,
		url: 'https://www.facebook.com/',
	},
	[SocialMediaType.Twitter]: {
		icon: FaXTwitter,
		url: 'https://www.twitter.com/',
	},
	[SocialMediaType.LinkedIn]: {
		icon: FaLinkedin,
		url: 'https://www.linkedin.com/in/',
	},
	[SocialMediaType.Youtube]: {
		icon: FaYoutube,
		url: 'https://www.youtube.com/@',
	},
	[SocialMediaType.TikTok]: {
		icon: FaTiktok,
		url: 'https://www.tiktok.com/@',
	},
};

export type SocialValue = {
	social: string;
	value: string;
};
