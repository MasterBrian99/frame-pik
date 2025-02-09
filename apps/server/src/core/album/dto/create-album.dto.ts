import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  @MaxLength(254, {
    message: 'Name must be shorter than 254 characters',
  })
  name: string;

  @ApiProperty()
  @IsString()
  @Matches(
    /^(?!^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$)[^<>:"/\\|?*\x00-\x1F]+$/,
    {
      message: 'Invalid folder name',
    },
  )
  @MaxLength(254, {
    message: 'Foler name must be shorter than 254 characters',
  })
  folderName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({
    description: 'id of collection that you own or manage',
  })
  @IsString()
  collectionId: number;
}
