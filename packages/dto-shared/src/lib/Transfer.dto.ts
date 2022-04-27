import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ITransfer } from '@bank-el/interfaces';

export class TransferDto implements ITransfer {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsOptional()
  @IsString()
  createdAt?: string;
  @IsOptional()
  @IsString()
  updatedAt?: string;
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  address?: string;
  @IsNotEmpty()
  @IsString()
  sender: string;
  @IsNotEmpty()
  @IsString()
  senderIBAN: string;
  @IsNotEmpty()
  @IsString()
  receiver: string;
  @IsNotEmpty()
  @IsString()
  receiverIBAN: string;
  @IsOptional()
  @IsString()
  accountId?: string;
}

export class TransferHistoryDto {
  @IsArray()
  transfers: TransferDto[];
}

export class GetTransfersByDateRangeDataDto {
  @IsNotEmpty()
  @IsString()
  from: string;
  @IsNotEmpty()
  @IsString()
  to: string;
}

export class SendTransferResponseDto {
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
  @IsNotEmpty()
  @IsNumber()
  transferID: number;
  @IsNotEmpty()
  @IsNumber()
  accountBalance: number;
  @IsNotEmpty()
  @IsString()
  message: string;
}

export type IJSONData = GetTransfersByDateRangeDataDto | TransferDto;
