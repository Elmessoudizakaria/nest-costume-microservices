import { Contrat } from '../interfaces/contart.interface';

export class CreateContratDto {
    readonly actuelPrice: number;
    readonly duration: number;
    readonly observation: string;
    readonly contraType: string;
    readonly clientId: number;
}

export class ContratDetailDto {
    readonly contrat: Contrat;
    readonly ligns: any[];
}

export class ContratDetail {
    readonly creationDate: Date;
    readonly actuelPrice: number;
    readonly duration: number;
    readonly observation: string;
    readonly contraType: string;
    readonly clientId: number;
    readonly isValide: boolean;
    readonly activatedLigns: [string];
    readonly waitingLigns: [string];
    readonly disabedLigns: [string];
    readonly clientName: string;
}
