import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ITransfer } from '../../../../../../interfaces/src/index';

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
