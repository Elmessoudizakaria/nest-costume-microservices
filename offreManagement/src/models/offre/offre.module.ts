import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { offreSchema } from '../../schema/offre.schema';
import { OffreController } from './offre.controller';
import { OffreService } from './offre.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Offre', schema: offreSchema }])
    ],
    controllers: [OffreController],
    providers: [OffreService]
})
export class OffreModule {}
