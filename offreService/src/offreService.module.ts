import { Module } from '@nestjs/common';
import { OffreModule } from './models/offre/offre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url:
                'mongodb+srv://primemanager:12345@test-r8ncv.gcp.mongodb.net/test?retryWrites=true&w=majority',
            entities: [join(__dirname, '**/**.entity{.ts,.js}')],
            useNewUrlParser: true,
            logging: true
        }),
        OffreModule
    ]
})
export class OffreServiceModule {}
