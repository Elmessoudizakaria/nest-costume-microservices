import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { contratSchema } from '../../schema/contart.schema';
import { ContratController } from './contrat.controller';
import { ContratService } from './contrat.service';
import { ExternalApiService } from '../../externals/externalApi';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Contrat', schema: contratSchema }]),
        HttpModule
    ],
    controllers: [ContratController],
    providers: [ContratService, ExternalApiService]
})
export class ContratModule {}
