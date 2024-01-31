import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utilities, WinstonModule } from 'nest-winston';
import { SchoolModule } from './school/school.module';
import { NewsModule } from './news/news.module';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? 'development.env'
          : process.env.NODE_ENV === 'production'
            ? 'production.env'
            : 'local.env',
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          timezone: 'Asia/Seoul',
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
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

    SchoolModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
