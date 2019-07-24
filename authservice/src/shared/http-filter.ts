import {
    Catch,
    ExceptionFilter,
    HttpException,
    ArgumentsHost
} from '@nestjs/common';
import { Response, Request } from 'express';
import { MyLogger } from './log.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const loger = new MyLogger();
        const now = Date.now();
        const errorResponse = {
            statusCode: status,
            timeStamp: new Date().toLocaleString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null
        };
        loger.error(
            `${request.method} ${request.url} ${Date.now() - now} ms`,
            JSON.stringify(errorResponse)
        );
        response.status(status).json(errorResponse);
    }
}
