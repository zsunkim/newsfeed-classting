import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { SchoolRepository } from './repository/school.repository';
import { StudentRepository } from './repository/student.repository';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, SchoolRepository, StudentRepository],
})
export class SchoolModule {}
