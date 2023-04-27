import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: any) {
    const { username, password } = dto;
    return this.AuthService.signin(username, password);
  }
  @Post('/signup')
  signup(@Body() dto: any) {
    const { username, password } = dto;
    return this.AuthService.signup(username, password);
  }
}
