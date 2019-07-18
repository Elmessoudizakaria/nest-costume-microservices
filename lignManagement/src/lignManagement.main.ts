import {NestFactory} from '@nestjs/core';
import { LignManagementModule } from './lignManagement.module';


async function ligneManageent(){
    const app = await NestFactory.create(LignManagementModule);
    app.listen(4004,()=>{
        console.log('LIGN SERVICE IS RUNNIGN OON PORT 4004')
    })

}
ligneManageent();