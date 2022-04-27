import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TransferDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsNotEmpty()
  @IsString()
  createdAt?: string;
  @IsNotEmpty()
  @IsString()
  updatedAt?: string;
  @IsNotEmpty()
  @IsString()
  date: string;
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
