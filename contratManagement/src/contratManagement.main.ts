import { ContratManagementModule } from "./contratManagement.module";
import { NestFactory } from '@nestjs/core';

async function contratManagement(){
    const app = await NestFactory.create(ContratManagementModule);

    app.listen(4001,()=>{
        console.log('CONTRAT MANAGEMENT IS RUNNING ON PORT 4001');
    })
}

contratManagement();