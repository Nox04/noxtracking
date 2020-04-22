import { EntityRepository, Repository } from 'typeorm';
import { Collection } from './collection.entity';

@EntityRepository(Collection)
export class CollectionRepository extends Repository<Collection> {}
