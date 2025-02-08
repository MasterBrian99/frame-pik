import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  expiresIn: string;
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  userId: number;

  constructor(data: {
    expiresIn: string;
    accessToken: string;
    userId: number;
  }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
    this.userId = data.userId;
  }
}
