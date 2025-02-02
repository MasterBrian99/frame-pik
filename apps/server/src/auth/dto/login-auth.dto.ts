import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    examples: ['brian@random.com'],
    description: 'email of the user ',
  })
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
}
