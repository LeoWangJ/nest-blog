import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpException,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmDecorator } from 'src/utils';
import { SigninUserDto } from './dto/signin-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
@Controller('auth')
@TypeOrmDecorator()
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signin')
  signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.AuthService.signin(username, password);
  }
  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signup(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    if (!username || !password) {
      throw new HttpException('名稱與密碼不得為空', 400);
    }

    return this.AuthService.signup(username, password);
  }
}
