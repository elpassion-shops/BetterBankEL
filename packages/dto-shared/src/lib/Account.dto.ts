import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountDetailsDto {
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  id: string;
  @IsNumber()
  @IsNotEmpty()
  accountBalance: number;
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}
