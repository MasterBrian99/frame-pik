import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { WallService } from './wall.service';
import { CreateWallDto } from './dto/create-wall.dto';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { StandardResponse } from 'src/common/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';
import { Auth } from 'src/decorators/http.decorators';
import { RoleType } from 'src/utils/role-type';
import { WallPagination } from './dto/wall-pagination.dto';

@Controller('wall')
@ApiTags('wall')
@ApiInternalServerErrorResponse({
  description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
})
export class WallController {
  constructor(private readonly wallService: WallService) {}

  @Auth([RoleType.ADMIN, RoleType.USER], {
    public: false,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateWallDto })
  @ApiOperation({
    summary: 'create new wall',
    description: 'creating a new with details',
  })
  @ApiCreatedResponse({
    description: 'Return `Success`',
  })
  @Post()
  async create(@Body() createWallDto: CreateWallDto) {
    try {
      const data = await this.wallService.create(createWallDto);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.WALL_CREATED,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @ApiOperation({
    summary: 'get all withdraw request with pagination current user',
    description: 'get all withdraw for current user with pagination',
  })
  @Auth([RoleType.ADMIN, RoleType.USER], {
    public: false,
  })
  @Get()
  async findAllCurrentUser(@Query() pagination: WallPagination) {
    try {
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        await this.wallService.findAll(pagination),
      );
    } catch (e) {
      throw e;
    }
  }
}
