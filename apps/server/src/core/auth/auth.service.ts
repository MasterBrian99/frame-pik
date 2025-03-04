import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from '../../integrations/database/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from '../../utils/error-messages';
import { PasswordService } from './password.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { TokenType } from '../../utils/constants';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { StorageService } from '../../integrations/storage/storage.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly passwordService: PasswordService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly storageService: StorageService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const alreadyExist = await this.userRepository.findOne({
      where: [
        { email: createAuthDto.email },
        { username: createAuthDto.username },
      ],
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
      user.token = crypto.randomBytes(39).toString('hex');
      user.username = createAuthDto.username;
      await this.userRepository.save(user);
      await this.storageService.initializeUserStorage(createAuthDto.username);
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
    return this.createAccessToken({
      role: user.role,
      userId: user.id,
      token: user.token,
    });
    // throw new Error('Method not implemented.');
  }
  async createAccessToken(data: {
    role: string;
    userId: number;
    token: string;
  }) {
    return new TokenPayloadDto({
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME'),
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
      userId: data.userId,
      token: data.token,
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
      user.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return user!;
  }
  async getCurrentUser(user: UserEntity) {
    const userEntity = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    if (!userEntity) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return {
      email: userEntity.email,
      id: userEntity.id,
      name: userEntity.name,
    };
  }
}
