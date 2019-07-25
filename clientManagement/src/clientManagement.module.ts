import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModle } from './models/client/client.module';
import { dbs } from '../../shared/config';
@Module({
    imports: [
        MongooseModule.forRoot(
            process.env.NODE_ENV.toString().startsWith('test')
                ? process.env.MONGO_TEST_URI
                : process.env.MONGO_DEV_URI
        ),
        ClientModle
    ]
})
export class ClientManagementModule {}
