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
  @IsString()
  @IsNotEmpty()
  type: 'outgoing' | 'incoming';
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
  fromOrToName: string;
  @IsNotEmpty()
  @IsNumber()
  accountId: number;
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
  @IsString()
  transferID: string;
  @IsNotEmpty()
  @IsNumber()
  accountBalance: number;
  @IsNotEmpty()
  @IsString()
  message: string;
}

export type IJSONData = GetTransfersByDateRangeDataDto | TransferDto;
