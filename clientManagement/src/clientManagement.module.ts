import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientModle } from "./client/client.module";

@Module({
    imports:[
        MongooseModule.forRoot('mongodb+srv://primemanager:12345@test-r8ncv.gcp.mongodb.net/clientmanager?retryWrites=true&w=majority'),
        ClientModle
    ]
})

export class ClientManagementModule{}