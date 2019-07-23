import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ClientManagementModule } from './clientManagement.module';

export async function clientManagement() {
    const app = await NestFactory.create(ClientManagementModule);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`CLIENT MANAGEMENT IS RUNNIGN ON PORT ${PORT}`);
    });
}

clientManagement();
