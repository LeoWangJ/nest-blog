import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private uerService: UserService,
    private jwtService: JwtService,
  ) {}
  async signin(username: string, password: string) {
    const user = await this.uerService.find(username);

    if (user && user.password === password) {
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
    throw new UnauthorizedException();
  }
  async signup(username: string, password: string) {
    const res = await this.uerService.create({
      username,
      password,
    });
    return res;
  }
}
