import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  create(@Body() userDto) {
    return this.userService.createUser(userDto);
  }
}
