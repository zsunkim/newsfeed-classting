import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';
import { StudentEntity } from './student.entity';
import { NewsEntity } from '../../news/entities/news.entity';

@Entity('school')
export class SchoolEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment', { comment: '학교 아이디' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 10, comment: '학교명' })
  name: string;

  @Column({ name: 'region', type: 'varchar', length: 5, comment: '지역' })
  region: string;

  @OneToMany(() => StudentEntity, (tbStudent) => tbStudent.school_id)
  students: StudentEntity[];

  @OneToMany(() => NewsEntity, (tbNews) => tbNews.school_id)
  news: NewsEntity[];
}
