import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'vova@mail.ru', description: 'user email' })
  readonly email: string;
  @ApiProperty({ example: '111223', description: 'user password' })
  readonly password: string;
  @ApiProperty({ example: 'Mrbob', description: 'user username' })
  readonly userName: string;
}
