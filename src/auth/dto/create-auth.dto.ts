import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    examples: ['pasindu@random.com'],
    description: 'email of the user ',
  })
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({
    examples: ['brian mc', 'pasindu pramodya'],
    description: 'name of the user.this is not required ',
  })
  @IsOptional()
  name?: string = '';
}
