import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffreModule } from './models/offre/offre.module';
import { dbs } from '../../shared/config';

@Module({
    imports: [
        MongooseModule.forRoot(dbs.offreService.uri, { useNewUrlParser: true }),
        OffreModule
    ]
})
export class OffreManagementModule {}
