import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';
import { SchoolEntity } from '../../school/entities/school.entity';

@Entity('news')
export class NewsEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment', { comment: '소식 아이디' })
  id: number;

  @PrimaryColumn({ name: 'school_id', type: 'int', comment: '학교 아이디' })
  school_id: number;

  @Column({ name: 'title', type: 'varchar', length: 50, comment: '제목' })
  title: string;

  @Column({ name: 'content', type: 'varchar', length: 1000, comment: '소식 내용' })
  content: string;

  @ManyToOne(() => SchoolEntity, (tbSchool) => tbSchool.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'school_id' }])
  school: SchoolEntity;
}
