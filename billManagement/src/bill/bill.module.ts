import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { billSchema } from "./schema/bill.schema";
import { BillController } from "./bill.controller";
import { BillService } from "./bill.service";


@Module({
   imports:[MongooseModule.forFeature([{name:'Bill',schema:billSchema}])],
   controllers:[BillController],
   providers:[BillService]
})

export class BillModule{}