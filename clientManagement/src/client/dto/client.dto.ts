
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