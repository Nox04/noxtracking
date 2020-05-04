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
import { Piece } from '../piece/piece.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('/:userId/collection-status/:collectionId')
  getCollectionStatus(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('collectionId', ParseUUIDPipe) collectionId: string,
  ): Promise<User> {
    return this.userService.getCollectionStatus(userId, collectionId);
  }
}
