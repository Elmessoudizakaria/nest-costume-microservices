import { Client } from "../interfaces/client.interface";

export class CreateClientDto{
    readonly rSocial:string;
    readonly noSiret:number;
    readonly adress:string;
    readonly fassoc:string;
}

export class UpdateContratClientDto{
    readonly noSiret:number;
    readonly idContrat:string;
}

export class FindClientDetailDto{
    readonly status:boolean;
    readonly client:Client;
    readonly detail:any;
}