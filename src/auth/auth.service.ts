import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PasswordService } from './password.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/utils/error-messages';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly passwordService: PasswordService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    try {
      const alreadyExist = await this.userRepository.findOne({
        where: { email: createAuthDto.email },
      });
      if (alreadyExist) {
        throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXIST);
      }
      const user = new UserEntity();
      user.email = createAuthDto.email;
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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
