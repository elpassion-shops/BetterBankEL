import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AccTransUserCreate1650906409425 implements MigrationInterface {
  name = 'AccTransUserCreate1650906409425';

  accountTable = new Table({
    name: 'accounts',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      { name: 'userId', type: 'int', isNullable: false },
      {
        name: 'accountBalance',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'accountNumber',
        type: 'decimal',
        isNullable: false,
      },
    ],
  });

  userTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'text',
        isNullable: false,
      },
    ],
  });

  transferTable = new Table({
    name: 'transfers',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'accountId',
        type: 'int',
        isNullable: false,
      },
      {
        name: 'type',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'title',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'amount',
        type: 'decimal',
        isNullable: false,
      },
      {
        name: 'fromOrToName',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'address',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'date',
        type: 'date',
        isNullable: false,
      },
    ],
  });

  accountForeignKey = new TableForeignKey({
    columnNames: ['userId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
  });

  transferForeignKey = new TableForeignKey({
    columnNames: ['accountId'],
    referencedColumnNames: ['id'],
    referencedTableName: 'accounts',
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable);
    await queryRunner.createTable(this.accountTable);
    await queryRunner.createTable(this.transferTable);
    await queryRunner.createForeignKey('accounts', this.accountForeignKey);
    await queryRunner.createForeignKey('transfers', this.transferForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
    await queryRunner.dropTable(this.accountTable);
    await queryRunner.dropTable(this.transferTable);
    await queryRunner.dropForeignKey('accounts', this.accountForeignKey);
    await queryRunner.dropForeignKey('transfers', this.transferForeignKey);
  }
}
