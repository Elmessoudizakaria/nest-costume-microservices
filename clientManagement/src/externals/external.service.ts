import { Injectable, HttpService } from '@nestjs/common';
import { services } from '../../../shared/proxies';
import { Observable } from 'rxjs';
@Injectable()
export class ExternalService {
    constructor(private readonly _http: HttpService) {}

    async getContrat(noSiret: number) {
        const path: string =
            services.contratService.path + '/client/detail/' + noSiret;
        return await this._http.get(path).toPromise();
    }

    async findBillsXMonth(contratId: string, month: number) {
        const path_2: string =
            services.billService.path + '/' + contratId + '/' + month;
        try {
            return await this._http.get(path_2).toPromise();
        } catch (error) {
            return error;
        }
    }
}
