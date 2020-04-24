import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: CollectionRepository,
  ) {}

  findAll(): Promise<Collection[]> {
    return this.collectionRepository.find({
      relations: ['pieces', 'collections', 'collections.pieces'],
    });
  }
}
