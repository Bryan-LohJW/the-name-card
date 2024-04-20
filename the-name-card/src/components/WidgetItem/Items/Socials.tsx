import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import OutsideClickHandler from 'react-outside-click-handler';
import { FaRegTrashCan } from 'react-icons/fa6';
import { TiPlus } from 'react-icons/ti';

import { SocialMediaType, SocialTypesMap, WidgetProp } from '.';
import './Socials.scss';

const SocialArray = z
	.object({ social: z.nativeEnum(SocialMediaType), value: z.string() })
	.array();

export type SocialArray = z.infer<typeof SocialArray>;

export const Socials: React.FC<WidgetProp> = ({ value, updateValue }) => {
	const rawValue = JSON.parse(value);
	let socialsValue = SocialArray.parse(rawValue);
	const [existingSocials, setExistingSocials] = useState<
		Set<SocialMediaType>
	>(new Set());
	const [showOptions, setShowOptions] = useState(false);

	useEffect(() => {
		socialsValue.map((social) => {
			setExistingSocials((prev) => prev.add(social.social));
		});
	});

	const optionStyle = {
		display: showOptions ? '' : 'none',
	};

	const toggleOptions = () => {
		setShowOptions((prev) => !prev);
	};

	const addSocial = (social: SocialMediaType) => {
		setExistingSocials((prev) => prev.add(social));
		socialsValue = [...socialsValue, { social: social, value: '' }];
		updateValue && updateValue(JSON.stringify(socialsValue));
	};

	const deleteSocial = (social: SocialMediaType, index: number) => {
		setExistingSocials((prev) => {
			prev.delete(social);
			return prev;
		});
		socialsValue.splice(index, 1);
		updateValue && updateValue(JSON.stringify(socialsValue));
	};

	const handleChange = (index: number, newValue: string) => {
		socialsValue[index].value = newValue;
		updateValue && updateValue(JSON.stringify(socialsValue));
	};
	return (
		<div className="widget__socials">
			{socialsValue.map((social, index) => {
				const socialType = SocialTypesMap[social.social];
				const SocialIcon = socialType.icon;
				return (
					<div
						key={socialType.icon.toString()}
						className="social-item"
					>
						<SocialIcon className="icon" />
						<div className="input-container">
							<p className="link">{socialType.url}</p>
							<input
								type="text"
								className="input"
								onChange={(e) => {
									handleChange(index, e.target.value);
								}}
							/>
						</div>
						<div
							className="delete"
							onClick={() => deleteSocial(social.social, index)}
						>
							<FaRegTrashCan className="trash" />
						</div>
					</div>
				);
			})}
			<div
				className={`add ${existingSocials.size >= 1 && 'hidden'}`}
				onClick={toggleOptions}
			>
				<TiPlus className="add-button" />

				<OutsideClickHandler
					onOutsideClick={() => {
						showOptions && toggleOptions();
					}}
				>
					<div className="add-options" style={optionStyle}>
						{Object.entries(SocialTypesMap).map((social) => {
							if (
								existingSocials.has(
									social[0] as SocialMediaType
								)
							)
								return;
							const Icon = social[1].icon;
							return (
								<div className="selection" key={social[0]}>
									<div
										className="icon-wrapper"
										onClick={() => {
											addSocial(
												social[0] as SocialMediaType
											);
										}}
									>
										<Icon className="icon" />
									</div>
								</div>
							);
						})}
					</div>
				</OutsideClickHandler>
			</div>
		</div>
	);
};
