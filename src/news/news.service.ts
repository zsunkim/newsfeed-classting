import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { NewsCreateReqDto } from './dtos/req/news.create.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsRepository } from './repository/news.repository';
import { NewsEntity } from './entities/news.entity';
import { NewsUpdateReqDto } from './dtos/req/news.update.req.dto';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { SchoolRepository } from '../school/repository/school.repository';

@Injectable()
export class NewsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(NewsRepository)
    private newsRepository: NewsRepository,
    @InjectRepository(SchoolRepository)
    private schoolRepository: SchoolRepository,
  ) {}

  /**
   * 새로운 학교 소식 생성하기
   * @param newsCreateReqDto
   * @return Promise<NewsEntity>
   */
  async createNews(newsCreateReqDto: NewsCreateReqDto): Promise<NewsEntity> {
    const school = await this.schoolRepository.findOneBy({ id: newsCreateReqDto.school_id });

    if (school === null) {
      throw new HttpException('학교 정보가 없습니다. 다시 시도해주세요.', HttpStatus.BAD_REQUEST);
    }

    try {
      const news = await this.newsRepository.insert(newsCreateReqDto);

      return this.newsRepository.findOneByOrFail({ id: news.identifiers[0].id });
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 학교 소식 수정하기
   * @param newsUpdateReqDto
   * @return Promise<NewsEntity>
   */
  async updateNews(newsUpdateReqDto: NewsUpdateReqDto): Promise<NewsEntity> {
    const news = await this.newsRepository.findOneBy({ id: newsUpdateReqDto.id });

    if (news === null) {
      throw new HttpException('존재하지 않는 소식입니다.', HttpStatus.BAD_REQUEST);
    }

    const updateData = {
      title: newsUpdateReqDto.title ?? news.title,
      content: newsUpdateReqDto.content ?? news.content,
    };

    try {
      await this.newsRepository.update(news.id, updateData);

      return this.newsRepository.findOneByOrFail({ id: news.id });
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 학교 소식 삭제하기
   * @param newsId 소식 아이디
   * @return Promise<boolean>
   */
  async deleteNews(newsId: number): Promise<boolean> {
    const checkData = await this.newsRepository.findOneBy({ id: newsId });

    if (checkData === null) {
      throw new HttpException('존재하지 않는 소식입니다.', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.newsRepository.delete({ id: newsId });
      return true;
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * 구독 중인 학교 페이지별 소식 목록 조회
   * @param schoolId 학교 아이디
   * @param studentId 학생 아이디
   * @return Promise<NewsEntity[]>
   */
  async getNewsListByMySchool(schoolId: number, studentId: string): Promise<NewsEntity[]> {
    const school = await this.schoolRepository.findOneBy({ id: schoolId });

    if (school === null) {
      throw new HttpException('학교 정보가 없습니다. 다시 시도해주세요.', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.newsRepository.findNewsByMySchool(schoolId, studentId);
    } catch (err) {
      this.logger.log({ level: 'error', message: err });
      throw new HttpException('죄송합니다. 다시 시도해주세요.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
