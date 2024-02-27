import { z } from 'zod';

import { WidgetProp } from '.';
import './Link.scss';

const LinkValues = z.object({ description: z.string(), link: z.string() });

export type LinkValues = z.infer<typeof LinkValues>;

export const Link: React.FC<WidgetProp> = ({ value, updateValue }) => {
	const rawValue = JSON.parse(value);
	const linkValues = LinkValues.parse(rawValue);

	const editDescription = (
		type: 'description' | 'link',
		newValue: string
	) => {
		linkValues[type] = newValue;
		updateValue && updateValue(JSON.stringify(linkValues));
	};
	return (
		<div className="link-inputs">
			<div className="input-wrapper">
				<label htmlFor="description" className="label">
					Description
				</label>
				<input
					className="input"
					type="text"
					id="description"
					value={linkValues.description}
					placeholder="My Link"
					onChange={(e) =>
						editDescription('description', e.target.value)
					}
				/>
			</div>
			<div className="input-wrapper">
				<label htmlFor="link" className="label">
					Link
				</label>
				<input
					className="input"
					type="text"
					id="link"
					value={linkValues.link}
					placeholder="https://www.myLink.com"
					onChange={(e) => editDescription('link', e.target.value)}
				/>
			</div>
		</div>
	);
};
