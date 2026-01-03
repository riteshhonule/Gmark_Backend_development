
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

  @ApiProperty({ example: 'Ritesh Honule' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ritesh@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ritesh123' })
  @IsString()
  @MinLength(6)
  password: string;
}

