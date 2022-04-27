import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccountDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  accountBalance: number;
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}
