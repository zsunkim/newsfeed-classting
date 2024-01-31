import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolRepository } from './repository/school.repository';
import { SchoolCreateReqDto } from './dtos/req/school.create.req.dto';
import { SchoolEntity } from './entities/school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolRepository)
    private schoolRepository: SchoolRepository,
  ) {}

  /**
   * 새로운 학교 페이지 생성
   * @param schoolCreateReqDto
   * @return Promise<SchoolEntity>
   */
  async createSchool(schoolCreateReqDto: SchoolCreateReqDto): Promise<SchoolEntity> {
    try {
      const school = await this.schoolRepository.save(schoolCreateReqDto);

      return this.schoolRepository.findOneByOrFail({ id: school.id });
    } catch (err) {
      throw err;
    }
  }
}
