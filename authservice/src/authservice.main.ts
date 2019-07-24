import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './authservice.module';
import { MyLogger } from './shared/log.service';

async function bootstrap() {
    const app = await NestFactory.create(AuthServiceModule, {
        logger: new MyLogger()
    });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
}
bootstrap();
