import { NestFactory } from '@nestjs/core';
import { ClientManagementModule } from './clientManagement.module';

export async function clientManagement(){
    const app = await NestFactory.create(ClientManagementModule);
    app.listen(4000,()=>{
        console.log('CLIENT MANAGEMENT IS RUNNIGN ON PORT 4000')
    })
}


clientManagement();