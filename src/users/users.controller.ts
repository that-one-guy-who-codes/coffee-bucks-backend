import { Controller } from '@nestjs/common';

// api/v1/users prefix for all routes inside.
@Controller({ path: 'users', version: '1' })
export class UsersController {}
