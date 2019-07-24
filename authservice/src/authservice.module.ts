import { Module } from '@nestjs/common';
import { AuthModule } from './models/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRoot(process.env.MONGO_TEST_URI), AuthModule]
})
export class AuthServiceModule {}
