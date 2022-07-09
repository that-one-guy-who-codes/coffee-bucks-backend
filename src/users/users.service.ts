import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(signupDto: SignupDto): Promise<User> {
    let newUser: User = new User();

    // Unpack the information
    newUser.name = signupDto.name;
    newUser.email = signupDto.email;
    newUser.phone = signupDto.phone;

    // Check if users email already exists in the database
    let userCheck = await this.userRepository.findOneBy({
      email: newUser.email,
    });

    if (userCheck !== null) {
      throw new UnauthorizedException('User already exists in the database');
    }

    let hashedPassword = await bcrypt.hash(signupDto.password, 10);
    newUser.password = hashedPassword;

    // Insert the new user
    await this.userRepository.insert(newUser);

    // Return the newly created user
    return newUser;
  }

  // For passport local strategy
  async findOneUser(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }
}
