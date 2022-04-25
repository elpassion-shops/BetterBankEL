import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ITransfer {
  @IsNumber()
  id?: number;
  @IsString()
  @IsNotEmpty()
  type: 'outgoing' | 'incoming';
  @IsNotEmpty()
  @IsString()
  date: string;
  amount: BigInteger;
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

export class ITransferHistory {
  @IsArray()
  transfers: ITransfer[];
}

export class IGetTransfersByDateRangeData {
  @IsNotEmpty()
  @IsString()
  from: string;
  @IsNotEmpty()
  @IsString()
  to: string;
}

export class ISendTransferResponse {
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

export type IJSONData = IGetTransfersByDateRangeData | ITransfer;
