import { PartialType } from '@nestjs/swagger';
import { CreateSnapDto } from './create-snap.dto';

export class UpdateSnapDto extends PartialType(CreateSnapDto) {}
