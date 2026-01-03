import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ritesh@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ritesh123' })
  @IsString()
  @MinLength(6)
  password: string;
}
