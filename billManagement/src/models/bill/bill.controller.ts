import { Controller, Body, Post, Param, Get } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from '../../dto/bill.dto';
import { Bill } from '../../interfaces/bill.interface';

@Controller('bill')
export class BillController {
    constructor(private readonly billService: BillService) {}

    @Post()
    async create(@Body() createBillDto: CreateBillDto): Promise<Bill> {
        return await this.billService.create(createBillDto);
    }

    @Get('contrat/:id')
    async getBillsByContrat(@Param('id') contratId: string): Promise<Bill[]> {
        return await this.billService.findByContrat(contratId);
    }

    @Get(':id/:month')
    async getBillsInLastXMonthByContrat(
        @Param('id') contratId: string,
        @Param('month') months: string
    ): Promise<Bill[]> {
        const month = parseInt(months);
        return await this.billService.findByContratAndLastXMonth(
            contratId,
            month
        );
    }
}
