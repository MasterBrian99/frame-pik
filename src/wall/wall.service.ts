import { Injectable } from '@nestjs/common';
import { CreateWallDto } from './dto/create-wall.dto';
import { UpdateWallDto } from './dto/update-wall.dto';

@Injectable()
export class WallService {
  create(createWallDto: CreateWallDto) {
    return 'This action adds a new wall';
  }

  findAll() {
    return `This action returns all wall`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wall`;
  }

  update(id: number, updateWallDto: UpdateWallDto) {
    return `This action updates a #${id} wall`;
  }

  remove(id: number) {
    return `This action removes a #${id} wall`;
  }
}
