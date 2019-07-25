export class CreateLignDto{
    readonly status:string;
    readonly offreId:string;
    readonly contratId:string;
}

export class UpdateLignStatusDto{
    readonly status:string;
    readonly lignId:string;
}