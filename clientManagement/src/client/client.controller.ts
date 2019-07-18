import { Controller, Body, Post, Param, Get, Put } from "@nestjs/common";
import { ClientService } from "./client.service";
import { CreateClientDto, UpdateContratClientDto } from "./dto/client.dto";
import { Client } from "./interfaces/client.interface";


@Controller('client')
export class ClientController{
    constructor(private clientService:ClientService){}


    @Get()
    async findAll():Promise<Client[]>{
        return await this.clientService.findAll();
    }

    @Post()
    async create(@Body() createClientDto:CreateClientDto):Promise<Client>{
        return await this.clientService.create(createClientDto);
    }

    @Get(':id')
    async getOne(@Param('id') id:string):Promise<Client|string>{
        const noSiret:number = parseInt(id);
        return await this.clientService.findOne(noSiret);
    }

    @Get('/down/:id')
    async turnOff(@Param('id') id:string):Promise<Client>{
        const noSiret:number = parseInt(id);
        return await this.clientService.trunOff(noSiret);
    }

    @Put()
    async updateContract(@Body() updateContratClientDto:UpdateContratClientDto){
        return await this.clientService.updateContracts(updateContratClientDto);
    }

}