import { ITransfer } from '@bank-el/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transfers' })
export class Transfer implements ITransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  type: 'outgoing' | 'incoming';

  @Column()
  amount: number;

  @Column()
  fromOrToName: string;

  @Column()
  address: string;

  @Column()
  date: string;

  @Column()
  title: string;
}
