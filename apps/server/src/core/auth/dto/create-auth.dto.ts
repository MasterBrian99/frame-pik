import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    examples: ['brian@example.com'],
    description: 'email of the user ',
  })
  @IsEmail()
  email: string;
  @ApiProperty()
  @MinLength(1, {
    message: 'Password must be at least 1 character',
  })
  @IsString()
  password: string;
  @ApiPropertyOptional({
    examples: ['brian mc', 'pasindu pramodya'],
    description: 'name of the user.this is not required ',
  })
  @IsOptional()
  name?: string = '';

  @ApiProperty({
    examples: ['brian'],
    description: 'username of the user ',
  })
  @IsString()
  username: string;
}
