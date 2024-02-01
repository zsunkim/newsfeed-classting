import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {
  constructor(dataSource: DataSource) {
    super(StudentEntity, dataSource.createEntityManager());
  }
}
