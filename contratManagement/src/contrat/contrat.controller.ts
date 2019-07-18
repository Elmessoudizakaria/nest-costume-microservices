import { Controller, Param, Get, Post, Body, Put } from "@nestjs/common";
import { ContratService } from "./contrat.service";
import { CreateContratDto } from "./dto/contart.dto";
import { ExternalApiService } from "./externals/externalApi";
import { Contrat } from "./interfaces/contart.interface";


@Controller('contrat')
export class ContratController{
    constructor(private contratService:ContratService,private externaleService:ExternalApiService){}

    @Post()
    async create(@Body() createContratDto:CreateContratDto){
        let client = await this.externaleService.checkClient(createContratDto.clientId);
       
        if(client.data){
            const contrat =  await this.contratService.create(createContratDto);
            const updateClient={noSiret:createContratDto.clientId,idContrat:contrat._id};
            const updatedClient = await this.externaleService.updateClient(updateClient);
            return contrat;
        }else{
            return 'CLIENT NOT EXIST'
        }
        
    }

    @Get('client/:id')
    async findByClient(@Param('id') idClient:string){
        const noSiret:number = parseInt(idClient);
        const contrats= await this.contratService.findByClient(noSiret);
        return contrats;
    }

    @Get('client/detail/:id')
    async findByClientDetails(@Param('id') idClient:string){
        const noSiret:number = parseInt(idClient);
        const contrats= await this.contratService.findDetailsByClient(noSiret);
        return contrats;
    }

    @Get(':id')
    async findById(@Param('id') id :string){
        return  await this.contratService.findById(id);
    }

    @Get('turnOn/:id')
    async turnOn(@Param('id') id :string){
        return await this.contratService.turnOn(id);
    }
    
    @Get('turnOff/:id')
    async turnOff(@Param('id') id :string){
        return await this.contratService.turnOff(id);
    }

    @Put()
    async updatecontratLigns(@Body() contrat:Contrat){
        return await this.contratService.updateLignsContrat(contrat);
    }
}