import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity {
  @Column({ name: 'created_id', type: 'varchar', length: 16, comment: '최초 생성자', default: 'SYSTEM' })
  created_id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: '생성일자' })
  created_at: Date;

  @Column({ name: 'updated_id', type: 'varchar', length: 16, comment: '마지막 수정자', default: 'SYSTEM' })
  updated_id: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', comment: '마지막 수정일자' })
  updated_at: Date;
}
