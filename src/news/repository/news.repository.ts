import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { NewsEntity } from '../entities/news.entity';

@Injectable()
export class NewsRepository extends Repository<NewsEntity> {
  constructor(dataSource: DataSource) {
    super(NewsEntity, dataSource.createEntityManager());
  }

  /**
   * 구독한 학교의 소식 리스트
   */
  async findNewsByMySchool(schoolId: number, studentId: string): Promise<NewsEntity[]> {
    return await this.createQueryBuilder('news')
      .leftJoin('student', 'news_student', 'news_student.school_id = news.school_id')
      .where('news.school_id = ? AND news_student.id = ?', { schoolId, studentId })
      .orderBy('created_at', 'DESC')
      .getMany();
  }
}
