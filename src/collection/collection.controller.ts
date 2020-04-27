import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param, Req,
  UseInterceptors,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';

@Controller('collection')
@UseInterceptors(ClassSerializerInterceptor)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  getCollections(
    @Req() req
  ): Promise<Collection[]> {
    console.log(req.get('origin'));
    return this.collectionService.findAll();
  }
  @Get('/slug/:slug')
  getCollectionBySlug(
    @Param('slug') id: string,
  ): Promise<Collection> {
    return this.collectionService.findBySlug(id);
  }
}
