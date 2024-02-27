import { useFormContext } from 'react-hook-form';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { MdOutlineWorkOutline, MdOutlineEmail, MdPhone } from 'react-icons/md';

import './EditProfileCore.scss';

const EditProfileCore = () => {
	const { register } = useFormContext();
	return (
		<div className="core-info">
			<div className="core-input">
				<label className="label" htmlFor="name">
					Name <FaRegAddressCard className="label-icon" />
				</label>
				<input
					className="input"
					id="name"
					type="text"
					{...register('profileName')}
				/>
			</div>
			<div className="core-input">
				<label className="label" htmlFor="bio">
					Bio <BiMessageDetail className="label-icon" />
				</label>
				<input
					className="input"
					id="bio"
					type="text"
					{...register('bio')}
				/>
			</div>
			<div className="core-input">
				<label className="label" htmlFor="designation">
					Designation <MdOutlineWorkOutline className="label-icon" />
				</label>
				<input
					className="input"
					id="designation"
					type="text"
					{...register('designation')}
				/>
			</div>
			<div className="core-input">
				<label className="label" htmlFor="phone">
					Phone <MdPhone className="label-icon" />
				</label>
				<input
					className="input"
					id="phone"
					type="text"
					{...register('phone')}
				/>
			</div>
			<div className="core-input">
				<label className="label" htmlFor="email">
					Email <MdOutlineEmail className="label-icon" />
				</label>
				<input
					className="input"
					id="email"
					type="text"
					{...register('email')}
				/>
			</div>
		</div>
	);
};

export { EditProfileCore };
