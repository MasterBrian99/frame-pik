import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { PageOptionsDto } from '../../../../common/pagination/page-options.dto';
import { COLLECTION_ROLE } from '../../../../utils/constants';

export default class GetUserCollectionDto extends PageOptionsDto {
  @ApiPropertyOptional({
    title: 'user id',
    description:
      'id of the user.this is optional if  getting current user collection',
  })
  @IsOptional({})
  userId: string;

  @ApiPropertyOptional({
    enum: [COLLECTION_ROLE.OWNER, COLLECTION_ROLE.USER],
  })
  @IsOptional()
  @IsIn([COLLECTION_ROLE.OWNER, COLLECTION_ROLE.USER])
  roleType: string;
}
