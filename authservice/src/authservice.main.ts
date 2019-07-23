import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './authservice.module';

async function bootstrap() {
    const app = await NestFactory.create(AuthServiceModule);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
}
bootstrap();
