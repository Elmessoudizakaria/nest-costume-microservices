import { Module } from '@nestjs/common';
import { OffreController } from './offre.controller';
import { OffreService } from './offre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offre } from './offre.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Offre])],
    controllers: [OffreController],
    providers: [OffreService]
})
export class OffreModule {}
