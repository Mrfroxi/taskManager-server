import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => User, (user) => user.refreshToken)
  user: User;
}
