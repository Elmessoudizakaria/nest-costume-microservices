import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillModule } from './bill/bill.module';

@Module({
    imports:[
        MongooseModule.forRoot('mongodb+srv://primemanager:12345@test-r8ncv.gcp.mongodb.net/billmanager?retryWrites=true&w=majority'),
        BillModule
    ]
})

export class BillManagementModule{}