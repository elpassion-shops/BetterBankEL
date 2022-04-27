import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class removeKeys1651062136415 implements MigrationInterface {
  name = 'removeKeys1651062136415';

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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('accounts', this.accountForeignKey);
    await queryRunner.dropForeignKey('transfers', this.transferForeignKey);
    await queryRunner.dropTable(this.userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable);
    await queryRunner.createForeignKey('accounts', this.accountForeignKey);
    await queryRunner.createForeignKey('transfers', this.transferForeignKey);
  }
}
