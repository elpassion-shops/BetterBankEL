import { Account } from './entities/Account.entity';
import { Transfer } from './entities/Transfer.entity';
import { createAccount1651066915218 } from './migrations/1651066915218-create_account';
import { createTransfer1651067459813 } from './migrations/1651067459813-create_transfer';

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
    migrations: [createAccount1651066915218, createTransfer1651067459813],
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
    migrations: [createAccount1651066915218, createTransfer1651067459813],
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
