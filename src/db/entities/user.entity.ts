import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'David', description: 'user firstName' })
  @Column({ default: '' })
  firstName: string;

  @ApiProperty({ example: 'Prokopeny', description: 'user lastName' })
  @Column({ default: '' })
  lastName: string;

  @ApiProperty({ example: 'Ladony', description: 'user userName' })
  @Column({ default: '' })
  userName: string;

  @ApiProperty({ example: 'vova@mail.ru', description: 'user email' })
  @Column()
  email: string;

  @ApiProperty({ example: '12345', description: 'user password' })
  @Column()
  password: string;

  @ApiProperty({ example: '/img12341242134125', description: 'user avatar' })
  @Column({ default: '' })
  avatar: string;

  @ApiProperty({ example: 'true/false', description: 'user verified' })
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
