import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCollectionDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @MaxLength(254, {
    message: 'Name must be shorter than 254 characters',
  })
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
}
