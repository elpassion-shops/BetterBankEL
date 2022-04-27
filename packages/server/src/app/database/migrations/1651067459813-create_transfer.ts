import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTransfer1651067459813 implements MigrationInterface {
  name = 'createTransfer1651067459813';

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
        name: 'amount',
        type: 'money',
        isNullable: false,
      },
      {
        name: 'address',
        type: 'text',
        isNullable: true,
      },
      {
        name: 'title',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'sender',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'senderIBAN',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'receiver',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'receiverIBAN',
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

  senderForeignKey = new TableForeignKey({
    columnNames: ['senderIBAN'],
    referencedColumnNames: ['accountNumber'],
    referencedTableName: 'accounts',
    onDelete: 'CASCADE',
  });

  receiverForeignKey = new TableForeignKey({
    columnNames: ['receiverIBAN'],
    referencedColumnNames: ['accountNumber'],
    referencedTableName: 'accounts',
    onDelete: 'CASCADE',
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.transferTable);
    await queryRunner.createForeignKey('transfers', this.senderForeignKey);
    await queryRunner.createForeignKey('transfers', this.receiverForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.transferTable);
    await queryRunner.dropForeignKey('transfers', this.senderForeignKey);
    await queryRunner.dropForeignKey('transfers', this.receiverForeignKey);
  }
}
