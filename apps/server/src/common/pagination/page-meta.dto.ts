import { ApiProperty } from '@nestjs/swagger';
import { PageMetaParametersDto } from './page-meta-parameters.dto';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly count: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaParametersDto) {
    this.page = pageOptionsDto.page;
    this.count = pageOptionsDto.count;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.count);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
