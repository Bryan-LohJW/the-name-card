import { useFormContext } from 'react-hook-form';
import { FaRegAddressCard } from 'react-icons/fa';
import { BiMessageDetail } from 'react-icons/bi';
import { MdOutlineWorkOutline, MdOutlineEmail, MdPhone } from 'react-icons/md';

import './EditProfileCore.scss';

const EditProfileCore = () => {
	const { register } = useFormContext();
	return (
		<div className="edit-profile__core-info">
			<div className="core-info__input">
				<label className="input__label" htmlFor="name">
					Name <FaRegAddressCard className="label__icon" />
				</label>
				<input
					className="input__field"
					id="name"
					type="text"
					{...register('profileName')}
				/>
			</div>
			<div className="core-info__input">
				<label className="input__label" htmlFor="bio">
					Bio <BiMessageDetail className="label__icon" />
				</label>
				<input
					className="input__field"
					id="bio"
					type="text"
					{...register('bio')}
				/>
			</div>
			<div className="core-info__input">
				<label className="input__label" htmlFor="designation">
					Designation <MdOutlineWorkOutline className="label__icon" />
				</label>
				<input
					className="input__field"
					id="designation"
					type="text"
					{...register('designation')}
				/>
			</div>
			<div className="core-info__input">
				<label className="input__label" htmlFor="phone">
					Phone <MdPhone className="label__icon" />
				</label>
				<input
					className="input__field"
					id="phone"
					type="text"
					{...register('phone')}
				/>
			</div>
			<div className="core-info__input">
				<label className="input__label" htmlFor="email">
					Email <MdOutlineEmail className="label__icon" />
				</label>
				<input
					className="input__field"
					id="email"
					type="text"
					{...register('email')}
				/>
			</div>
		</div>
	);
};

export { EditProfileCore };
