import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class NewsUpdateReqDto {
  @ApiProperty({ example: 1, description: '소식 아이디', required: true })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ example: '제목: 신규 과목 신설', description: '제목', required: true })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: '소식지 내용입니다.', description: '내용', required: true })
  @IsOptional()
  @IsString()
  content?: string;
}
