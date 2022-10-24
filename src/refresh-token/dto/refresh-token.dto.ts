import { ApiProperty } from '@nestjs/swagger';

export class DecodeVerifyToken {
  @ApiProperty({ example: '33', description: 'token id' })
  readonly id: number;
  @ApiProperty({ example: '1666195308', description: 'When token Issued' })
  readonly iat: number;
  @ApiProperty({ example: '1666209708', description: 'When token will expire' })
  readonly exp: number;
}
