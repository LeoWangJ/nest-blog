import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RolesEnum } from 'src/enum/config.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.userService.find(req.user.username);

    if (user.roles.filter((item) => item.id === RolesEnum.GENERAL).length > 0) {
      return true;
    }
    return false;
  }
}
