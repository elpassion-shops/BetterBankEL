import { ITransfer } from '@bank-el/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './Account.entity';

@Entity({ name: 'transfers' })
export class Transfer implements ITransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  amount: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  sender: string;

  @ManyToOne((type) => Account)
  @JoinColumn({ referencedColumnName: 'accountNumber', name: 'senderIBAN' })
  senderIBAN: string;

  @Column()
  receiver: string;

  @ManyToOne((type) => Account)
  @JoinColumn({ referencedColumnName: 'accountNumber', name: 'receiverIBAN' })
  receiverIBAN: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
