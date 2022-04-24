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

    entities: [], //TODO: Add entities
    migrationsTableName: 'migrations',
    migrations: ['dist/**/migrations/*.js'],
    cli: {
      migrationsDir: './src/database/migrations',
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

    entities: [], //TODO: Add entities
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

    entities: ['./src/**/*.entity.ts'], // tests run on TS directly
    migrations: ['./src/**/migrations/*.ts'],
    migrationsTableName: 'migrations',

    cli: {
      migrationsDir: './src/database/migrations',
    },
  },
];
