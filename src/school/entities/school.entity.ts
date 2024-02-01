import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';
import { StudentEntity } from './student.entity';

@Entity('school')
export class SchoolEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'varchar', comment: '학교명' })
  name: string;

  @Column({ name: 'region', type: 'varchar', comment: '지역' })
  region: string;

  @OneToMany(() => StudentEntity, (tbStudent) => tbStudent.school_id)
  students: StudentEntity[];
}
