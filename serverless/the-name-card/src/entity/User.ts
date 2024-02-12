// @ts-nocheck
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from 'typeorm';
import { Profile } from 'src/entity/';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@OneToOne(() => Profile)
	@JoinColumn()
	profile: Profile;
}
