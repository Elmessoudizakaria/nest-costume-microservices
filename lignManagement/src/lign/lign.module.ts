import { Module, HttpModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { lignSchema } from "./schema/lign.schema";
import { LignController } from "./lign.controller";
import { LignService } from "./lign.service";
import { ExternalService } from "./external/external.service";


@Module({
    imports:[
        MongooseModule.forFeature([{name:'Lign',schema:lignSchema}]),
        HttpModule
    ],
    controllers:[LignController],
    providers:[LignService,ExternalService]
})

export class LignModule{}