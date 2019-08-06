import { NestFactory } from '@nestjs/core';
import { OffreServiceModule } from './offreService.module';

async function builder() {
    const app = await NestFactory.create(OffreServiceModule);
    app.listen(3000, () => {
        console.log('server is runing on port 3000');
    });
}

builder();
