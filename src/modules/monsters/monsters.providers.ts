import { Connection } from 'mongoose';
import { monsterSchema } from './schemas/monster.schema';

export const catsProviders = [
  {
    provide: 'MONSTER_MODEL',
    useFactory: (connection: Connection) => connection.model('Monster', monsterSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];