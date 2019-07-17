import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OffreModule } from "./offre/offre.module";


@Module({
    imports:[
        MongooseModule.forRoot('mongodb+srv://primemanager:12345@test-r8ncv.gcp.mongodb.net/offremanager?retryWrites=true&w=majority'),
        OffreModule
    ]
})

export class OffreManagementModule{}