import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Inject,
  LoggerService,
  Body,
  Param,
  Query,
  UseFilters,
  Headers,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getUserDto } from './dto/get-user.dto';
import { TypeOrmDecorator } from 'src/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin/admin.guard';

@Controller('user')
@TypeOrmDecorator()
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init');
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  getUserProfile(@Query('id', ParseIntPipe) id: any): any {
    return this.userService.findProfile(id);
  }

  @Get()
  getUsers(@Query() query: getUserDto): any {
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 46 ~ UserController ~ getUsers ~ query',
      query,
    );
    return this.userService.findAll(query);
  }

  @Post()
  addUser(@Body(CreateUserPipe) dto: CreateUserDto): any {
    const user = dto as User;
    // user -> dto.username
    // return this.userService.addUser();
    return this.userService.create(user);
  }

  @Get('/:id')
  getUser(): any {
    return 'hello world';
    // return this.userService.getUsers();
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id') id: number,
    @Headers('Authorization') headers: any,
  ): any {
    if (id === headers) {
      const user = dto as User;
      return this.userService.update(id, user);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number): any {
    return this.userService.remove(id);
  }

  // todo
  // logs Modules
  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2);
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res;
  }
}
