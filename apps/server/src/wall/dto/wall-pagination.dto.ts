import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PageOptionsDto } from 'src/common/pagination/page-options.dto';

export class WallPagination extends PageOptionsDto {
  @ApiPropertyOptional({
    title: 'user id',
    description:
      'id of the user.this is optional if  getting current user bank details',
  })
  @IsOptional({})
  userId: string;
}
