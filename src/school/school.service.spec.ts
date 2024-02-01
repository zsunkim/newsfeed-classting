import { Test, TestingModule } from '@nestjs/testing';
import { SchoolService } from './school.service';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import { SchoolRepository } from './repository/school.repository';
import { StudentRepository } from './repository/student.repository';
import { DataSource } from 'typeorm';
import { SchoolCreateReqDto } from './dtos/req/school.create.req.dto';
import { TypeORMMySqlTestingModule } from '../news/news.service.spec';
import { SchoolEntity } from './entities/school.entity';
import { StudentEntity } from './entities/student.entity';

describe('SchoolService', () => {
  let service: SchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule, TypeORMMySqlTestingModule([SchoolEntity, StudentEntity])],
      providers: [
        SchoolService,
        SchoolRepository,
        StudentRepository,
        DataSource,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: { log: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
  });

  describe('createSchoolPage', () => {
    const schoolCreateReqDto: SchoolCreateReqDto = {
      name: '제주대학교',
      region: '제주',
    };

    it('should return an school data', async () => {
      const result = await service.createSchool(schoolCreateReqDto);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
