import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';

@Entity({ name: 'school' })
export class SchoolEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'name', type: 'string', comment: '학교명' })
  name: string;

  @Column({ name: 'region', type: 'string', comment: '지역' })
  region: string;
}
