import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContratModule } from "./contrat/contart.module";


@Module({
    imports:[
        MongooseModule.forRoot('mongodb+srv://primemanager:12345@test-r8ncv.gcp.mongodb.net/contractmanager?retryWrites=true&w=majority'),
        ContratModule
    ]
})

export class ContratManagementModule{}