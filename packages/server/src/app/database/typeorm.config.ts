import { Account } from './entities/Account.entity';
import { Transfer } from './entities/Transfer.entity';
import { AccTransUserCreate1650906409425 } from './migrations/1650906409425-Acc_Trans_User_Create';

module.exports = [
  {
    name: 'default', //for all environments
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',
    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: [Transfer, Account], //TODO: Add entities
    migrationsTableName: 'migrations',
    migrations: [AccTransUserCreate1650906409425],
    cli: {
      migrationsDir: './packages/server',
    },
  },
  {
    name: 'production', //for all environments
    type: 'postgres',
    url: process.env.DATABASE_URL,
    schema: 'public',
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: [Transfer, Account], //TODO: Add entities
    migrationsTableName: 'migrations',
    migrations: ['dist/**/migrations/*.js'],
    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    schema: 'public',

    synchronize: false,
    migrationsRun: true,

    logging: process.env.DATABASE_LOGGING === 'true',

    autoLoadEntities: true,

    entities: ['./packages/server/src/**/*.entity.ts'], // tests run on TS directly
    migrations: ['./packages/server/src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './packages/server/src/app/database/migrations',
    },
  },
];
