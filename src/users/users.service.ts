import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(dto) {
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
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return user;
  }
}
