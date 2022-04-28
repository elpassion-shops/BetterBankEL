import { ITransferSendFormData } from '@bank-el/interfaces';
import {
  IsDate,
  IsIBAN,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinDate,
  MinLength,
} from 'class-validator';

export class SendTransferValidation implements ITransferSendFormData {
  @IsOptional()
  @IsString()
  @MaxLength(35, { message: 'type less than 35 letters' })
  @MinLength(5, { message: 'type more than 5 letters' })
  receiverAddress: string;

  @IsIBAN({ message: 'please enter a valid IBAN account number' })
  receiverBankAccountNumber: string;

  @IsString()
  @MaxLength(35, { message: 'type less than 35 letters' })
  @MinLength(5, { message: 'type more than 5 letters' })
  receiverName: string;

  @IsIBAN({ message: 'please enter a valid IBAN account number' })
  senderBankAccountNumber: string;

  @Max(1000000, { message: 'enter an amount less than 1000000' })
  @Min(1, {
    message: 'enter an amount greater than 1',
  })
  transferAmount: number;

  @MinDate(new Date(new Date().getTime() - 24 * 60 * 60 * 1000), {
    message: "select today's date or a later date",
  })
  @IsDate({
    message: 'select the date of the transfer',
  })
  transferDate: Date;

  @IsString()
  @MaxLength(50, { message: 'type less than 50 letters' })
  @MinLength(5, { message: 'type more than 5 letters' })
  transferTitle: string;
}
