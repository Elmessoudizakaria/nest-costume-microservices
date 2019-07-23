import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModle } from './client/client.module';
import { dbs } from '../../shared/config';
@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_DEV_URI), ClientModle]
})
export class ClientManagementModule {}
