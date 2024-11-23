import { COLLABORATOR_ROLE } from 'src/utils/constant';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateWallDto } from './dto/create-wall.dto';
import { WallEntity } from 'src/database/entity/wall.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/utils/error-messages';
import { Transactional } from 'typeorm-transactional';
import { WallCollaboratorEntity } from 'src/database/entity/wall-collaborator.entity';
import { ContextProvider } from 'src/providers/context.provider';
import { WallPagination } from './dto/wall-pagination.dto';

@Injectable()
export class WallService {
  private readonly logger = new Logger(WallService.name);

  constructor(
    @InjectRepository(WallEntity)
    private readonly wallRepository: Repository<WallEntity>,
    @InjectRepository(WallCollaboratorEntity)
    private readonly wallCollaboratorRepository: Repository<WallCollaboratorEntity>,
  ) {}

  @Transactional()
  async create(createWallDto: CreateWallDto) {
    try {
      const currentUser = ContextProvider.getAuthUser();
      const wall = new WallEntity();
      wall.name = createWallDto.name;
      wall.description = createWallDto.description;
      wall.isPublic = createWallDto.isPublic;
      const savedWall = await this.wallRepository.save(wall);

      const wallCollaborator = new WallCollaboratorEntity();
      wallCollaborator.wall = savedWall;
      wallCollaborator.collaboratorRole = COLLABORATOR_ROLE.OWNER;
      wallCollaborator.user = currentUser;
      await this.wallCollaboratorRepository.save(wallCollaborator);
      return;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(pagination: WallPagination) {
    const queryBuilder = this.wallRepository.createQueryBuilder('wall');
    queryBuilder.leftJoinAndSelect('wall.collaborators', 'collaborators');
    queryBuilder.where('collaborators.user = :userId', {
      userId: pagination.userId,
    });
    if (pagination.status) {
      queryBuilder.andWhere('wall.status = :status', {
        status: pagination.status,
      });
    }
    if (pagination.search) {
      queryBuilder.andWhere('wall.name LIKE :search', {
        search: `%${pagination.search}%`,
      });
    }
  }
}
