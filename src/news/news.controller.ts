import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { NewsCreateReqDto } from './dtos/req/news.create.req.dto';
import { NewsUpdateReqDto } from './dtos/req/news.update.req.dto';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: '새로운 학교 소식 생성하기', description: '새로운 학교 소식 생성 API' })
  @ApiOkResponse({
    description: '새로운 학교 소식 생성',
    schema: {
      example: {
        statusCode: HttpStatus.CREATED.valueOf(),
        data: {
          id: 3,
          school_id: 2,
          title: '제목: 신규 과목 신설',
          content: '소식지 내용입니다.',
          created_id: 'SYSTEM',
          created_at: '2024-02-01T21:49:40.657Z',
          updated_id: 'SYSTEM',
          updated_at: '2024-02-01T21:49:40.657Z',
        },
      },
    },
  })
  @ApiBody({ type: NewsCreateReqDto })
  @Post()
  async createNews(@Body() newsCreateReqDto: NewsCreateReqDto) {
    return await this.newsService.createNews(newsCreateReqDto);
  }

  @ApiOperation({ summary: '학교 소식 수정하기', description: '학교 소식 수정 API' })
  @ApiOkResponse({
    description: '학교 소식 수정하기',
    schema: {
      example: {
        statusCode: HttpStatus.OK.valueOf(),
        data: {
          id: 3,
          school_id: 2,
          title: '신규 과목 신설',
          content: '소식지 내용입니다.',
          created_id: 'SYSTEM',
          created_at: '2024-02-01T21:49:40.657Z',
          updated_id: 'SYSTEM',
          updated_at: '2024-02-01T21:51:06.000Z',
        },
      },
    },
  })
  @ApiBody({ type: NewsUpdateReqDto })
  @Patch()
  async updateNews(@Body() newsUpdateReqDto: NewsUpdateReqDto) {
    return await this.newsService.updateNews(newsUpdateReqDto);
  }

  @ApiOperation({ summary: '학교 소식 삭제하기', description: '학교 소식 삭제 API' })
  @ApiOkResponse({
    description: '학교 소식 삭제하기',
    schema: {
      example: {
        statusCode: HttpStatus.OK.valueOf(),
        data: true,
      },
    },
  })
  @ApiParam({ name: 'news_id', description: '소식 아이디', example: 1, required: true })
  @Delete(':news_id')
  async deleteNews(@Param('news_id') newsId: number) {
    return await this.newsService.deleteNews(newsId);
  }

  @ApiOperation({
    summary: '구독중인 학교 페이지별 소식 목록 조회',
    description: '구독중인 학교 페이지별 소식 목록 조회 API',
  })
  @ApiOkResponse({
    description: '구독중인 학교 페이지별 소식 목록 조회',
    schema: {
      example: {
        statusCode: HttpStatus.OK.valueOf(),
        data: [
          {
            id: 3,
            school_id: 2,
            title: '신규 과목 신설',
            content: '소식지 내용입니다.',
            created_id: 'SYSTEM',
            created_at: '2024-02-01T21:49:40.657Z',
            updated_id: 'SYSTEM',
            updated_at: '2024-02-01T21:51:06.000Z',
          },
        ],
      },
    },
  })
  @ApiParam({ name: 'student_id', description: '학생 아이디', example: 'ashe', required: true })
  @ApiParam({ name: 'school_id', description: '학교 아이디', example: 1, required: true })
  @Get('list/:student_id/:school_id')
  async getNewsListByMySchool(@Param('school_id') schoolId: number, @Param('student_id') studentId: string) {
    return await this.newsService.getNewsListByMySchool(schoolId, studentId);
  }
}
