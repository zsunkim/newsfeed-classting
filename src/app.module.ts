import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { utilities, WinstonModule } from 'nest-winston';
import { ManageModule } from './manage/manage.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('NEWS', { prettyPrint: true }),
          ),
        }),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        new (require('winston-daily-rotate-file'))({
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.splat(),
            winston.format.printf((info) => {
              if (typeof info.message === 'object') {
                info.message = JSON.stringify(info.message, null, 3);
              }
              return `[${info.timestamp}] ${info.level}: ${info.message}`;
            }),
          ),
          level: 'debug',
          filename: 'logs/info-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '30d',
        }),
      ],
    }),

    ManageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
