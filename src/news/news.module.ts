import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './repository/news.repository';
import { SchoolRepository } from '../school/repository/school.repository';

@Module({
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, SchoolRepository],
})
export class NewsModule {}
