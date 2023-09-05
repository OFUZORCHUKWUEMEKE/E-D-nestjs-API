import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productServive: ProductService) { }
    @Get('/')
    async GetProducts() {

    }

    @Get(':/id')
    async GetProductById() {

    }

    @Post('/')
    async CreateProduct() {

    }
}
