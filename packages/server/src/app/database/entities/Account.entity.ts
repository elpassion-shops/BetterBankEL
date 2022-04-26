import { IAccountDetails } from '@bank-el/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transfer } from './Transfer.entity';
import { User } from './User.entity';

@Entity({ name: 'accounts' })
export class Account implements IAccountDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  accountBalance: number;

  @Column()
  accountNumber: string;
}
