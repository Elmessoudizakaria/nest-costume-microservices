import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.listen(3000, () => {
        console.log('API GETWAY IS RUNNING ON PORT 3000');
    });
}

bootstrap();
