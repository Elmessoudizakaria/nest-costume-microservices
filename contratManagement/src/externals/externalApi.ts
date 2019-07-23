import { Injectable, HttpService } from '@nestjs/common';
import { services } from '../../../shared/proxies';

@Injectable()
export class ExternalApiService {
    constructor(private readonly http: HttpService) {}

    async checkClient(noSiret: number) {
        const path: string = services.clientService.path + '/' + noSiret;
        return await this.http.get(path).toPromise();
    }
    async updateClient(client) {
        const path: string = services.clientService.path;
        return await this.http.put(path, client).toPromise();
    }

    async findLigns(contratId: string) {
        const path: string =
            services.lignService.path + '/contrat/' + contratId;
        try {
            return await this.http.get(path).toPromise();
        } catch (error) {
            return error;
        }
    }
}
