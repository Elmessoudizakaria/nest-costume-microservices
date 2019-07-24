import { LoggerService } from '@nestjs/common';
import { createWriteStream } from 'fs';
const logger = createWriteStream('C:/Users/z.elmessoudi/logger/logs', {
    flags: 'a'
});
export class MyLogger implements LoggerService {
    log(message: string) {
        console.log(!message ? '' : message);
        logger.write(message);
    }
    error(message: string, trace: string) {
        console.log(message + ' : ' + trace);
        const log = message + ' : ' + trace + '\n';
        logger.write(log);
    }
    warn(message: string) {}
    debug(message: string) {}
    verbose(message: string) {}
}
