import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from '../../interfaces/bill.interface';
import { CreateBillDto } from '../../dto/bill.dto';

@Injectable()
export class BillService {
    constructor(@InjectModel('Bill') private readonly billModel: Model<Bill>) {}

    async create(createBillDto: CreateBillDto): Promise<Bill> {
        const createdBill = new this.billModel(createBillDto);
        return await createdBill.save();
    }

    async findByContrat(contratId: string): Promise<Bill[]> {
        const filter = { contratId: contratId };
        return await this.billModel.find(filter).exec();
    }

    async findByContratAndLastXMonth(contratId: string, months: number) {
        let date = new Date();
        date.setMonth(date.getMonth() - months);
        const filter = { contratId: contratId, dateCreation: { $gte: date } };
        return await this.billModel.find(filter).exec();
    }
}
