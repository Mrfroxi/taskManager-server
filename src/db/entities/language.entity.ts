import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  locale: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.language)
  user: User[];
}
