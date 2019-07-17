import { OffreManagementModule } from "./offreManagement.module";
import { NestFactory } from '@nestjs/core';

async function offreManagement(){
    const app = await NestFactory.create(OffreManagementModule);
    app.listen(4002,()=>{
        console.log('OFFRE MANAGEMENT IS RUNNING ON PORT 4002');
    })
}

offreManagement();