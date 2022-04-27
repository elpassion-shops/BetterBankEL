import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createAccount1651066915218 implements MigrationInterface {
  name = 'createAccount1651066915218';

  accountTable = new Table({
    name: 'accounts',
    columns: [
      {
        name: 'email',
        type: 'text',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'accountBalance',
        type: 'money',
        isNullable: false,
      },
      {
        name: 'accountNumber',
        isPrimary: true,
        type: 'text',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.accountTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.accountTable);
  }
}
