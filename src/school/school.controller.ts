import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SchoolCreateReqDto } from './dtos/req/school.create.req.dto';

@ApiTags('School')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({ summary: '새로운 학교 페이지 생성하기', description: '새로운 학교 페이지 생성 API' })
  @ApiOkResponse({
    description: '새로운 학교 페이지 생성',
    schema: {
      example: {
        statusCode: HttpStatus.CREATED.valueOf(),
        data: {
          id: 2,
          name: '제주대학교',
          region: '제주',
          created_id: 'SYSTEM',
          created_at: '2024-02-01T20:53:35.105Z',
          updated_id: 'SYSTEM',
          updated_at: '2024-02-01T20:53:35.105Z',
        },
      },
    },
  })
  @ApiBody({ type: SchoolCreateReqDto })
  @Post()
  async createSchool(@Body() schoolCreateReqDto: SchoolCreateReqDto) {
    return this.schoolService.createSchool(schoolCreateReqDto);
  }

  @ApiOperation({ summary: '학교 페이지 구독하기', description: '학교 페이지 구독 API' })
  @ApiOkResponse({
    description: '학교 페이지 구독하기',
    schema: {
      example: {
        statusCode: HttpStatus.CREATED.valueOf(),
        data: true,
      },
    },
  })
  @ApiParam({ name: 'student_id', description: '학생 아이디', example: 'ashe', required: true })
  @ApiParam({ name: 'school_id', description: '학교 아이디', example: 1, required: true })
  @Post('sub/:student_id/:school_id')
  async subscribeSchoolPage(@Param('student_id') studentId: string, @Param('school_id') schoolId: number) {
    return this.schoolService.subscribeSchoolPage(studentId, schoolId);
  }

  @ApiOperation({ summary: '학교 페이지 구독 취소하기', description: '학교 페이지 구독 취소 API' })
  @ApiOkResponse({
    description: '학교 페이지 구독 취소하기',
    schema: {
      example: {
        statusCode: HttpStatus.OK.valueOf(),
        data: true,
      },
    },
  })
  @ApiParam({ name: 'student_id', description: '학생 아이디', example: 'ashe', required: true })
  @ApiParam({ name: 'school_id', description: '학교 아이디', example: 1, required: true })
  @Delete('unsub/:student_id/:school_id')
  async unsubscribeSchoolPage(@Param('student_id') studentId: string, @Param('school_id') schoolId: number) {
    return this.schoolService.unsubscribeSchoolPage(studentId, schoolId);
  }

  @ApiOperation({ summary: '구독 중인 학교 리스트 조회', description: '구독 중인 학교 리스트 조회 API' })
  @ApiOkResponse({
    description: '구독 중인 학교 리스트 조회',
    schema: {
      example: {
        statusCode: HttpStatus.OK.valueOf(),
        data: [
          {
            id: 'ashe',
            school_id: 2,
            created_id: 'SYSTEM',
            created_at: '2024-02-01T21:13:19.708Z',
            updated_id: 'SYSTEM',
            updated_at: '2024-02-01T21:13:19.708Z',
          },
        ],
      },
    },
  })
  @ApiParam({ name: 'student_id', description: '학생 아이디', example: 'ashe', required: true })
  @Get('list/:student_id')
  async getMySubscribeList(@Param('student_id') studentId: string) {
    return this.schoolService.getMySubscribeList(studentId);
  }
}
