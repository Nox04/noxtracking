import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SaveProgressDto } from './dto/save-progress.dto';
import { GetUserId } from '../auth/get-user.decorator';

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

  @Get('/:userId/collection-status/:collectionSlug')
  getCollectionStatus(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('collectionSlug') collectionSlug: string,
  ): Promise<User> {
    return this.userService.getCollectionStatus(userId, collectionSlug);
  }

  @Post('/save-progress')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(ValidationPipe)
  saveProgress(
    @GetUserId() userId: string,
    @Body() saveProgressDto: SaveProgressDto,
  ): Promise<boolean> {
    return this.userService.saveProgressOnPiece(saveProgressDto, userId);
  }
}
