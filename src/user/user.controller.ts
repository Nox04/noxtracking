import { ClassSerializerInterceptor, Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getTasks(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
