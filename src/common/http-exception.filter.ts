import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as string | { error: string; statusCode: 400; message: string[] };

    if (typeof err !== 'string') {
      return response.status(status).json({
        statusCode: status,
        message: err.message,
      });
    }

    response.status(status).json({
      statusCode: status,
      message: err,
    });
  }
}
