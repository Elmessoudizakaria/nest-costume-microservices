import {
    Injectable,
    HttpService,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { services } from '../../../shared/proxies';
@Injectable()
export class ApiService {
    constructor(private _http: HttpService) {}
    async getSolver(path: string): Promise<any> {
        const realPath = this.realPath(path);
        try {
            return await this._http.get(realPath).toPromise();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
    async postSolver(path: string, body: any) {
        const realPath = this.realPath(path);
        try {
            return await this._http.post(realPath, body).toPromise();
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    realPath(path: string) {
        if (path.startsWith('/api/client')) {
            return services.clientService.path;
        } else if (path.startsWith('/api/contrat')) {
            return services.contratService.path;
        } else if (path.startsWith('/api/bill')) {
            return services.billService.path;
        } else if (path.startsWith('/api/offre')) {
            return services.offreService.path;
        } else if (path.startsWith('/api/lign')) {
            return services.lignService.path;
        } else {
            return 'NOTHING';
        }
    }
}
