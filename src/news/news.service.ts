import { Injectable } from '@nestjs/common';
import { NewsCreateReqDto } from './dtos/req/news.create.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsRepository } from './repository/news.repository';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsRepository)
    private newsRepository: NewsRepository,
  ) {}

  /**
   * 새로운 학교 소식 생성하기
   * @param newsCreateReqDto
   * @return Promise<NewsEntity>
   */
  async createNews(newsCreateReqDto: NewsCreateReqDto): Promise<NewsEntity> {
    try {
      const news = await this.newsRepository.insert(newsCreateReqDto);

      return this.newsRepository.findOneByOrFail({ id: news.raw.id });
    } catch (err) {
      throw err;
    }
  }
}
