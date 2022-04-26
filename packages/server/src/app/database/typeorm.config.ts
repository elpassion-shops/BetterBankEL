import { Account } from './entities/Account.entity';
import { Transfer } from './entities/Transfer.entity';
import { User } from './entities/User.entity';

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

    entities: [User, Transfer, Account], //TODO: Add entities
    migrationsTableName: 'migrations',
    // migrations: ['./dist/*'],
    cli: {
      migrationsDir: './src/app/database/migrations',
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

    entities: [User, Transfer, Account], //TODO: Add entities
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
