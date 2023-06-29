import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private uerService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(username: string, password: string) {
    const user = await this.uerService.find(username);

    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword) {
      throw new ForbiddenException('用户名稱或密碼錯誤！');
    }
    const access_token = await this.jwtService.signAsync({
      username: user.username,
      sub: user.id,
    });

    return {
      access_token,
      id: user.id,
      username: user.username,
      profile: user.profile,
      roles: user.roles,
    };
  }
  async signup(username: string, password: string) {
    const user = await this.uerService.find(username);
    if (user) {
      throw new ForbiddenException('用戶已存在');
    }
    const res = await this.uerService.create({
      username,
      password,
    });
    return res;
  }
}
