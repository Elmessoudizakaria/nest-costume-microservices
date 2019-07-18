import { Controller, Post, Body, Put } from "@nestjs/common";
import { LignService } from "./lign.service";
import { CreateLignDto, UpdateLignStatusDto } from "./dto/lign.dto";


@Controller('lign')
export class LignController{
    constructor(private readonly lignService: LignService){}

    @Post()
    async create(@Body() createLignDto:CreateLignDto){
        return await this.lignService.create(createLignDto);
    }

    @Put()
    async updatedStatus(@Body() updatedLignDto:UpdateLignStatusDto){
        return await this.lignService.updateStatus(updatedLignDto.lignId,updatedLignDto.status);
    }
}