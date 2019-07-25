import { Injectable, HttpService } from '@nestjs/common';
import { services } from '../../../shared/proxies';

@Injectable()
export class ExternalService {
    constructor(private _http: HttpService) {}

    async checkoutContrat(contratId: string) {
        const path: string = services.contratService.path + '/' + contratId;
        return await this._http.get(path).toPromise();
    }

    async updateContrat(contrat: any) {
        const path: string = services.contratService.path;
        return await this._http.put(path, contrat).toPromise();
    }
}
