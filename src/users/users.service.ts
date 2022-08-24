import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const uniqueUser = await this.findUserByEmail(dto.email);

    if (uniqueUser) {
      throw new HttpException('this user already exists', HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.save(
      this.userRepository.create(dto),
    );
    return user;
  }

  async findUserById(id): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async findUserByEmail(email) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) return null;

    return user;
  }
}
