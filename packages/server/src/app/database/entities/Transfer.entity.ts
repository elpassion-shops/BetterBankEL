import { ITransfer } from '@bank-el/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transfers' })
export class Transfer implements ITransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  date: string;

  @Column()
  amount: number;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column()
  sender: string;

  @Column()
  senderIBAN: string;

  @Column()
  receiver: string;

  @Column()
  receiverIBAN: string;

  @Column()
  accountId: string;
}
