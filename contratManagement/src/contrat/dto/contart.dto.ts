import { Contrat } from "../interfaces/contart.interface";

export class CreateContratDto{
    readonly actuelPrice:number;
    readonly duration:number;
    readonly observation:string;
    readonly contraType:string;
    readonly clientId:number;
}

export class ContratDetailDto{
    readonly contrat:Contrat;
    readonly bills:any[]
}