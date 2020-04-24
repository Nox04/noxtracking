import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { Collection } from './collection.entity';

@Controller('collection')
@UseInterceptors(ClassSerializerInterceptor)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  getCollections(): Promise<Collection[]> {
    return this.collectionService.findAll();
  }
}
