import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
    constructor(private productServive: ProductService, private productRepository: ProductRepository) { }
    @Get('/')
    async GetProducts() {
        await this.productServive.GetProducts()
    }

    @Get(':/id')
    async GetProductById(@Param("id") id): Promise<Product> {
        return await this.productServive.GetProductById(id)
    }

    @Post('/')
    async CreateProduct() {

    }
}
