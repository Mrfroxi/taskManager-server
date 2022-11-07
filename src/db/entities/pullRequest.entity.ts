import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PullRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  commentPullRequest: string;

  @Column()
  developer: string;

  @Column({ default: '' })
  typeDeveloper: string;

  @Column()
  createAt: Date;

  @Column()
  refTo: string;

  @Column()
  reWhere: string;
}
