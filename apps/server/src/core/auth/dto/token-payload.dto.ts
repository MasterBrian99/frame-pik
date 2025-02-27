import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  expiresIn: string;
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  userId: number;
  @ApiProperty()
  token: string;
  constructor(data: {
    expiresIn: string;
    accessToken: string;
    userId: number;
    token: string;
  }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
    this.userId = data.userId;
    this.token = data.token;
  }
}
