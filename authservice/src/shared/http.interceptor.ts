import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyLogger } from './log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const loger = new MyLogger();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() =>
                    loger.error(
                        `${method} ${url} ${new Date().toLocaleString()} ${Date.now() -
                            now} ms`,
                        context.getClass().name
                    )
                )
            );
    }
}
