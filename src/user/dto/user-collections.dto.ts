import { User } from '../user.entity';
import { Collection } from '../../collection/collection.entity';

export class UserCollectionsDto extends User{
  collections?: Collection[];
}
