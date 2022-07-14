import { Permissions } from 'src/common/enums/permission.enum';
import { Role } from 'src/common/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Union } from './union.entity';
import { User } from './user.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { array: true, default: [] })
  permission: Permissions[];

  @Column('simple-array', { array: true, default: [] })
  roles: Role[];

  @ManyToOne(() => User, (user) => user.permission)
  user: User;

  @ManyToOne(() => Union, (union) => union.permission)
  union: Union;
}
