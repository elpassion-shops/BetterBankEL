import { IAccountDetails } from '@bank-el/interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
export class Account implements IAccountDetails {
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: 'money', nullable: false })
  accountBalance: number;

  @PrimaryColumn()
  accountNumber: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
