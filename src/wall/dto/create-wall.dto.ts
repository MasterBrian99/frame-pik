import { IsOptional, IsString, Length } from 'class-validator';

export class CreateWallDto {
  @IsString({
    message: 'Name is required',
    always: true,
  })
  @Length(1, 100, {
    message: 'Name must be between 1 and 100 characters',
  })
  name: string;

  @IsOptional()
  description: string;
}
