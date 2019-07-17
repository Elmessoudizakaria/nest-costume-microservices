import { BillManagementModule } from "./billManagement.module";
import { NestFactory } from '@nestjs/core';

async function billManagement(){
    const app = await NestFactory.create(BillManagementModule);

    app.listen(4003,()=>{
        console.log('BILL MANAGEMENT SERVICE IS RUNNING ON PORT 4003');
    })
}

billManagement();