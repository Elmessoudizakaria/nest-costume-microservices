import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { dbs } from '../../shared/config';
import { LignModule } from './models/lign/lign.module';
@Module({
    imports: [MongooseModule.forRoot(dbs.lignService.uri), LignModule]
})
export class LignManagementModule {}
