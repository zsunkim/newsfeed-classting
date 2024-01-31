import { Body, Controller, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchoolCreateReqDto } from './dtos/req/school.create.req.dto';

@ApiTags('School')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({ summary: '새로운 학교 페이지 생성하기', description: '새로운 학교 페이지 생성 API' })
  @ApiBody({ type: SchoolCreateReqDto })
  @Post()
  async createSchool(@Body() schoolCreateReqDto: SchoolCreateReqDto) {
    return this.schoolService.createSchool(schoolCreateReqDto);
  }
}
