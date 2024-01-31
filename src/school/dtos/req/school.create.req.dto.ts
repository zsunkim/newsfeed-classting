import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SchoolCreateReqDto {
  @ApiProperty({ example: '제주대학교', description: '학교명', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: '제주', description: '학교 지역', required: true })
  @IsString()
  region: string;
}
