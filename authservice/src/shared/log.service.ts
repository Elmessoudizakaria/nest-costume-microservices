import { LoggerService } from '@nestjs/common';
// import { writeFileSync } from 'fs';
export class MyLogger implements LoggerService {
    log(message: string) {
        const curentTime: Date = new Date();
        const log: string = message + ' AT : ' + curentTime.toLocaleString();
        console.log(!message ? '' : log);
        // writeFileSync('./logs', log);
    }
    error(message: string, trace: string) {
        console.log(message + ' : ' + trace);
    }
    warn(message: string) {}
    debug(message: string) {}
    verbose(message: string) {}
}
