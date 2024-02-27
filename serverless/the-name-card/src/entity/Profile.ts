// @ts-nocheck

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
	@PrimaryGeneratedColumn()
	userId: number;

	@Column({
		type: String,
		unique: false,
		nullable: true,
	})
	profileImage: string | null;

	@Column({
		type: String,
		unique: false,
		nullable: true,
	})
	bannerImage: string | null;

	@Column({
		type: String,
		unique: false,
		nullable: true,
	})
	bannerColor: string | null;

	@Column({
		type: String,
		unique: false,
		nullable: false,
	})
	profileName: string;

	@Column({
		type: String,
		unique: false,
		nullable: false,
	})
	bio: string;

	@Column({
		type: String,
		unique: false,
		nullable: false,
	})
	designation: string;

	@Column({
		type: String,
		unique: false,
		nullable: false,
	})
	phone: string;

	@Column({
		type: String,
		unique: false,
		nullable: false,
	})
	profileEmail: string;

	@Column({
		type: String,
		unique: false,
		nullable: true,
	})
	widgetProps: string | null;
}
