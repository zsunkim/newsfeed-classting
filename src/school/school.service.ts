import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolRepository } from './repository/school.repository';
import { SchoolCreateReqDto } from './dtos/req/school.create.req.dto';
import { SchoolEntity } from './entities/school.entity';
import { StudentRepository } from './repository/student.repository';
import { StudentEntity } from './entities/student.entity';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';

@Injectable()
export class SchoolService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(SchoolRepository)
    private schoolRepository: SchoolRepository,
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  /**
   * 새로운 학교 페이지 생성
   * @param schoolCreateReqDto
   * @return Promise<SchoolEntity>
   */
  async createSchool(schoolCreateReqDto: SchoolCreateReqDto): Promise<SchoolEntity> {
    const checkData = await this.schoolRepository.findOneBy(schoolCreateReqDto);

    if (checkData) {
      throw new HttpException('이미 존재하는 학교입니다.', HttpStatus.BAD_REQUEST);
    }

    try {
      const school = await this.schoolRepository.insert(schoolCreateReqDto);

      return this.schoolRepository.findOneByOrFail({ id: school.raw.id });
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw err;
    }
  }

  /**
   * 학교 페이지 구독하기
   * @param studentId 학생 아이디
   * @param schoolId 구독할 학교 아이디
   */
  async subscribeSchoolPage(studentId: string, schoolId: number) {
    const subSchoolData = {
      id: studentId,
      school_id: schoolId,
    };

    const checkData = await this.studentRepository.findOneBy(subSchoolData);

    if (checkData) {
      throw new HttpException('이미 구독중입니다.', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.studentRepository.insert(subSchoolData);
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 학교 페이지 구독 취소하기
   * @param studentId 구독 취소할 학생 아이디
   * @param schoolId 취소당하는 학교 아이디
   */
  async unsubscribeSchoolPage(studentId: string, schoolId: number) {
    const unsubData = {
      id: studentId,
      school_id: schoolId,
    };

    const checkData = await this.studentRepository.findOneBy(unsubData);

    if (checkData) {
      throw new HttpException('학교 페이지 정보가 없습니다.', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.studentRepository.delete(unsubData);
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 구독 중인 학교 리스트 조회
   * @param studentId 조회할 학생 아이디
   * @return Promise<StudentEntity[]>
   */
  async getMySubscribeList(studentId: string): Promise<StudentEntity[]> {
    try {
      return await this.studentRepository.findBy({ id: studentId });
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
