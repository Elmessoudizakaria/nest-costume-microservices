import { Controller, Get, Param, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) {}

    @Get('/*')
    async doGet(@Req() request: Request): Promise<any> {
        const result = await this.apiService.getSolver(request.url);
        return result.data;
    }
    @Post('/*')
    async doPost(@Req() request: Request, @Body() data: any) {
        const result = await this.apiService.postSolver(request.url, data);
        return result.data;
    }
}
