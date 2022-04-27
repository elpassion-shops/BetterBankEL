import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountDetailsDto {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsNumber()
  @IsNotEmpty()
  accountBalance: number;
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
  @IsString()
  @IsNotEmpty()
  createdAt?: string;
  @IsString()
  @IsNotEmpty()
  updatedAt?: string;
}
