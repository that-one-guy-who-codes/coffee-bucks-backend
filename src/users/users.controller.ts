import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

// api/v1/users prefix for all routes inside.
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  async signup(signupDto: SignupDto): Promise<User> {
    return this.usersService.createUser(signupDto);
  }

  // Built in Route guard which uses the passport local strategy to authenticate for us,
  // this calls the validate method defined in the LocalStrategy.
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // user is populated by passport on successful authentication.
    return this.authService.login(req.user.id);
  }
}
