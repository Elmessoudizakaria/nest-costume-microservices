import { Module } from "@nestjs/common";
import {MongooseModule  } from '@nestjs/mongoose';
import { clientSchema } from "./schema/client.schema";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name:'Client',schema:clientSchema}])
    ],
    controllers:[ClientController],
    providers:[ClientService]
})

export class ClientModle{}