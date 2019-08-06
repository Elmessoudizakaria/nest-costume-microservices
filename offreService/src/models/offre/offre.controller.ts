import { Controller, Body, Post, Get } from '@nestjs/common';
import { OffreService } from './offre.service';
import { Offre } from './offre.entity';
import { MakeOffreDto, OffreDetail } from '../../dto/offre.dto';

@Controller('offre')
export class OffreController {
    constructor(private readonly service: OffreService) {}

    @Get()
    async findAll(): Promise<OffreDetail[]> {
        return await this.service.findAll();
    }

    @Post()
    async makeOne(@Body() offre: Offre): Promise<Offre> {
        return await this.service.makeOne(offre);
    }
}
