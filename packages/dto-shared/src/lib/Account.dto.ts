import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccountDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @IsNumber()
  @IsNotEmpty()
  accountBalance: BigInteger;
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}