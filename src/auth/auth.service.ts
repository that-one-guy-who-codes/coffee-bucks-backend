import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Authenticating user 'locally'
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(email);

    if (user != null) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        // Skip the password on returning information back to user
        // on a successful authentication
        const { password, ...result } = user;
        return result;
      }
    }

    // Return null if authentication failed at any step.
    return null;
  }

  async login(id: string) {
    const payload = { id };

    return {
      access_token: this.jwtService.sign(id),
    };
  }
}
