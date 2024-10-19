import { Controller, Post, Body, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { StandardResponse } from 'src/common/standard-response';
import { SUCCESS_MESSAGES } from 'src/utils/success-messages';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() body: CreateAuthDto) {
    this.logger.log(body);
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
  @Post()
  async userLogin(@Body() body: LoginAuthDto) {
    this.logger.log(body);
    try {
      const data = await this.authService.userLogin(body);
      return new StandardResponse(
        HttpStatus.CREATED,
        SUCCESS_MESSAGES.SUCCESS,
        data,
      );
    } catch (e) {
      throw e;
    }
  }
  // @Post('login')
  // async login(@Body() body) {
  //   const auth = await this.authService.login(body);
  //   res.status(auth.status).json(auth.msg);
  // }
}
