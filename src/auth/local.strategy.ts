import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';

/**
 * This is the local strategy implementation for Passport.
 * The user is validating against the application database, instead of outside authentication
 * like facebook, google, oAuth etc.
 *
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Make passport expect email instead of the default username.
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
