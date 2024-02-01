import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class NewsCreateReqDto {
  @ApiProperty({ example: 1, description: '학교 아이디', required: true })
  @IsNumber()
  school_id: number;

  @ApiProperty({ example: '제목: 신규 과목 신설', description: '제목', required: true })
  @IsString()
  title: string;

  @ApiProperty({ example: '소식지 내용입니다.', description: '내용', required: true })
  @IsString()
  content: string;
}
