import { ITransfer } from '@bank-el/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  senderIBAN: string;

  @Column()
  receiver: string;

  @Column()
  receiverIBAN: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
