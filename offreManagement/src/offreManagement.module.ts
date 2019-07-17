import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OffreModule } from "./offre/offre.module";
import {dbs} from '../../shared/config';

@Module({
    imports:[
        MongooseModule.forRoot(dbs.offreService.uri),
        OffreModule
    ]
})

export class OffreManagementModule{}