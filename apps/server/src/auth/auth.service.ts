import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PasswordService } from './password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RoleType } from 'src/utils/role-type';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from 'src/utils/token-type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly passwordService: PasswordService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const alreadyExist = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
    });
    if (alreadyExist) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXIST);
    }
    try {
      const user = new UserEntity();
      user.email = createAuthDto.email;
      user.name = createAuthDto.name;
      user.password = await this.passwordService.hashPassword(
        createAuthDto.password,
      );
      await this.userRepository.save(user);
      return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async userLogin(body: LoginAuthDto) {
    const user = await this.validateUser(body);
    return this.createAccessToken({ role: user.role, userId: user.id });
    // throw new Error('Method not implemented.');
  }

  async createAccessToken(data: { role: RoleType; userId: number }) {
    return new TokenPayloadDto({
      expiresIn: this.configService.get<number>('JWT_EXPIRATION_TIME'),
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }
  async validateUser(userLoginDto: LoginAuthDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: userLoginDto.email,
      },
    });
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const isPasswordValid = await this.passwordService.validatePassword(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user!;
  }
  async getCurrentUser(user: UserEntity) {
    return {
      email: user.email,
      userId: user.id,
    };
  }
}