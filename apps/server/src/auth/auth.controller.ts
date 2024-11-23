import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Logger,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StandardResponse } from 'src/common/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Auth } from 'src/decorators/http.decorators';
import { RoleType } from 'src/utils/role-type';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { UserEntity } from 'src/database/entity/user.entity';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { TokenPayloadDto } from './dto/token-payload.dto';

@Controller('auth')
@ApiTags('auth')
@ApiInternalServerErrorResponse({
  description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateAuthDto })
  @ApiOperation({
    summary: 'create new user',
    description: 'creating a new with email and password',
  })
  @ApiCreatedResponse({
    description: 'Return `Success`',
  })
  @ApiConflictResponse({
    description: ERROR_MESSAGES.USER_ALREADY_EXIST,
  })
  @Post()
  async register(@Body() body: CreateAuthDto) {
    try {
      const data = await this.authService.register(body);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.ACCOUNT_CREATED,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginAuthDto })
  @ApiOperation({
    summary: 'login as a user',
    description: 'login with email and password',
  })
  @ApiCreatedResponse({
    description: 'Return `Success`',
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGES.USER_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'current user info',
    type: TokenPayloadDto,
  })
  @Post('login')
  async userLogin(@Body() body: LoginAuthDto) {
    try {
      const data = await this.authService.userLogin(body);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'get current user details',
  })
  @ApiCreatedResponse({
    description: 'Return `Success`',
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGES.USER_NOT_FOUND,
  })
  @Auth([RoleType.ADMIN, RoleType.USER], {
    public: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'current user info',
    type: null,
  })
  // @ApiOkResponse({ type: UserDto, description: 'current user info' })
  async getCurrentUser(@AuthUser() user: UserEntity) {
    try {
      const data = await this.authService.getCurrentUser(user);
      return new StandardResponse(
        HttpStatus.OK,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
}
