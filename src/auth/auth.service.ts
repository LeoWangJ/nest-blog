import { Injectable } from '@nestjs/common';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private uerService: UserService) {}
  async signin(username: string, password: string) {
    const res = await this.uerService.findAll({ username } as getUserDto);
    return res;
  }
  signup(username: string, password: string) {
    return 'signup';
  }
}
