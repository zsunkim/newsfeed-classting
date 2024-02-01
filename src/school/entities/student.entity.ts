import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';
import { SchoolEntity } from './school.entity';

@Entity('student')
export class StudentEntity extends CommonEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', comment: '학생 아이디' })
  id: string;

  @PrimaryColumn({ name: 'school_id', type: 'int', comment: '학교 아이디' })
  school_id: number;

  @ManyToOne(() => SchoolEntity, (tbSchool) => tbSchool.id, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'school_id' }])
  school: SchoolEntity;
}
