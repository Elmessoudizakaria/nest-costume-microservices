import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { clientSchema } from '../../schema/client.schema';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ExternalService } from '../../externals/external.service';
import { ClientRepo } from '../../interfaces/client.repo';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }]),
        HttpModule
    ],
    controllers: [ClientController],
    providers: [ClientService, ExternalService, ClientRepo]
})
export class ClientModle {}
