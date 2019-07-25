import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContratModule } from './models/contrat/contart.module';
import { dbs } from '../../shared/config';

@Module({
    imports: [MongooseModule.forRoot(dbs.contratService.uri), ContratModule]
})
export class ContratManagementModule {}
