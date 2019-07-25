import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillModule } from './models/bill/bill.module';
import { dbs } from '../../shared/config';
@Module({
    imports: [MongooseModule.forRoot(dbs.billService.uri), BillModule]
})
export class BillManagementModule {}
