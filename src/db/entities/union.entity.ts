import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { Task } from './task.entity';

@Entity()
export class Union {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logo: string;

  @Column()
  location: string;

  @Column()
  created_at: string;

  @OneToMany(() => Permission, (permission) => permission.union)
  permission: Permission[];

  @OneToMany(() => Task, (task) => task.union)
  task: Task[];
}
