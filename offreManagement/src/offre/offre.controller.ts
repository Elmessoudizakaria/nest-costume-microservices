import { Controller, Body, Post, Get, Param } from "@nestjs/common";
import { OffreService } from "./offre.service";
import { CreateOffreDto } from "./dto/offre.dto";


@Controller('offre')
export class OffreController{
    constructor(private offreService:OffreService){}

    @Post()
    async create(@Body() createOffreDto:CreateOffreDto){
        return await this.offreService.create(createOffreDto);
    }

    @Get(':id')
    async findOne(@Param('id') id:string){
        return await this.offreService.findOne(id);
    }

    @Get()
    async findAll(){
        return await this.offreService.findAll();
    }
}