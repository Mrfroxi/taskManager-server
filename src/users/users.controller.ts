import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/db/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Post()
  create(@Body() userDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'user search by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
