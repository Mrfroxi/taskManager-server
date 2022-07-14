import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Union } from './union.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.task)
  user: User;

  @ManyToOne(() => Union, (union) => union.task)
  union: Union;
}
