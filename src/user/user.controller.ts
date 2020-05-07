import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserCollectionsDto } from './dto/user-collections.dto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserCollectionsDto> {
    return this.userService.findOne(id);
  }

  @Get('/:userId/collection-status/:collectionSlug')
  getCollectionStatus(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('collectionSlug') collectionSlug: string,
  ): Promise<User> {
    return this.userService.getCollectionStatus(userId, collectionSlug);
  }
}
