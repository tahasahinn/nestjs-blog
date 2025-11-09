import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {h
  @IsString()
  @IsNotEmpty()j
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
