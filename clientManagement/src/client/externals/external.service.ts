import { Injectable, HttpService } from "@nestjs/common";
import { services } from '../../../../shared/proxies';
@Injectable()
export class ExternalService{
    constructor(private readonly _http:HttpService){}

    async getContrat(noSiret:number){
        const path: string = services.contratService.path+'/client/'+noSiret;
        return await this._http.get(path).toPromise();
    }
}