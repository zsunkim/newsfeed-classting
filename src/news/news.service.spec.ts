import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import { NewsCreateReqDto } from './dtos/req/news.create.req.dto';
import { NewsRepository } from './repository/news.repository';
import { SchoolRepository } from '../school/repository/school.repository';
import { NewsUpdateReqDto } from './dtos/req/news.update.req.dto';
import { NewsEntity } from './entities/news.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEntity } from '../school/entities/school.entity';

export const TypeORMMySqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Ashesun123!',
    database: 'news_feed',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  });

describe('NewsService', () => {
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule, TypeORMMySqlTestingModule([NewsEntity, SchoolEntity])],
      providers: [
        NewsService,
        NewsRepository,
        SchoolRepository,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: { log: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
  });

  describe('createNews', () => {
    const newsCreateReqDto: NewsCreateReqDto = {
      school_id: 1,
      title: '제목: 신규 과목 신설',
      content: '소식지 내용입니다.',
    };

    it('should return an news data', async () => {
      const result = service.createNews(newsCreateReqDto);
      expect(result).toBeInstanceOf(Object);
    });
  });

  describe('updateNews', () => {
    const newsUpdateReqDto: NewsUpdateReqDto = {
      id: 1,
      title: '수정중...',
      content: '소식지 내용입니다.',
    };

    it('should return an updated news data', async () => {
      const newsCreateReqDto: NewsCreateReqDto = {
        school_id: 1,
        title: '제목: 신규 과목 신설',
        content: '소식지 내용입니다.',
      };

      const news = await service.createNews(newsCreateReqDto);

      const result = await service.updateNews(newsUpdateReqDto);
      expect(result.id).toEqual(news.id);
    });
  });
});
