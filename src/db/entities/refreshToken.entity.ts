import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  expires_in: string;

  @ManyToOne(() => User, (user) => user.refreshToken)
  user: User;
}
