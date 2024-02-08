// @ts-nocheck

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	userId: number;

	@Column()
	profileImage: string;

	@Column()
	bannerImage: string;

	@Column()
	bannerColor: string;

	@Column()
	profileName: string;

	@Column()
	bio: string;

	@Column()
	designation: string;

	@Column()
	phone: string;

	@Column()
	profileEmail: string;

	@Column()
	widgetProps: string;
}
