import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offre } from './offre.entity';
import { Repository, MongoRepository } from 'typeorm';
import { MakeOffreDto, OffreDetail } from '../../dto/offre.dto';
@Injectable()
export class OffreService {
    constructor(
        @InjectRepository(Offre) private readonly repo: MongoRepository<Offre>
    ) {}

    async findAll(): Promise<OffreDetail[]> {
        return await this.repo.find();
    }

    async makeOne(offre: Offre) {
        return await this.repo.save(offre);
    }
}
