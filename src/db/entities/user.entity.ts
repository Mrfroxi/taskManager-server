import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Language } from './language.entity';
import { Permission } from './permission.entity';
import { RefreshToken } from './refreshToken.entity';
import { Task } from './task.entity';
import { Union } from './union.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: false })
  verified: boolean;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshToken: RefreshToken[];

  @ManyToOne(() => Language, (language) => language.user)
  language: Language;

  @OneToMany(() => Permission, (permission) => permission.user)
  permission: Permission[];

  @OneToMany(() => Task, (task) => task.user)
  task: Task[];

  @ManyToMany(() => Union)
  @JoinTable()
  relation: Union[];
}
