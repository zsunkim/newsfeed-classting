import { DataSource, Repository } from 'typeorm';
import { SchoolEntity } from '../entities/school.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolRepository extends Repository<SchoolEntity> {
  constructor(dataSource: DataSource) {
    super(SchoolEntity, dataSource.createEntityManager());
  }
}
