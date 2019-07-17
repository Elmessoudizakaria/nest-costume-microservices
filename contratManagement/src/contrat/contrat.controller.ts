import { Controller, Param, Get, Post, Body } from "@nestjs/common";
import { ContratService } from "./contrat.service";
import { CreateContratDto } from "./dto/contart.dto";
import { ExternalApiService } from "./externals/externalApi";


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
        // const contrats= await this.contratService.findByClient(noSiret);
        const test = await this.contratService.testCascad(noSiret);
        return test;

        
    }

    @Get(':id')
    async findById(@Param('id') id :string){
        const contrat = await this.contratService.findById(id);
        const bills = await this.externaleService.findBills(id);
        return {contrat,bills:bills.data};

    }
}