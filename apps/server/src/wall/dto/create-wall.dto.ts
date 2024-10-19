import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateWallDto {
  @IsString({
    message: 'Name is required',
    always: true,
  })
  @Length(1, 100, {
    message: 'Name must be between 1 and 100 characters',
  })
  @ApiProperty({
    examples: ['my collection'],
    description: 'name of the wall.this is not required',
  })
  name: string;

  @ApiPropertyOptional({
    examples: [''],
    description: 'add description to the wall. this is not required',
  })
  @IsOptional()
  description?: string = '';

  @IsOptional()
  @ApiPropertyOptional({
    examples: [true, false],
    description: 'is the wall public or not.default is false',
  })
  isPublic?: boolean = false;
}
