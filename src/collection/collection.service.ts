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

  findBySlug(slug: string): Promise<Collection> {
    return this.collectionRepository.findOne({
      where: { slug },
      relations: ['pieces', 'collections', 'collections.pieces'],
    });
  }

  findById(id: string): Promise<Collection> {
    return this.collectionRepository.findOne(id, {
      relations: ['pieces', 'collections', 'collections.pieces'],
    });
  }
}
