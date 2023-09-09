import { Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService, private productRepository: ProductRepository) { }
    @Get('/')
    async GetProducts() {
        await this.productService.GetProducts()
    }

    @Get(':/id')
    async GetProductById(@Param("id") id): Promise<Product> {
        return await this.productService.GetProductById(id)
    }

    @Post('/')
    async CreateProduct(product: CreateProduct) {
        return await this.productService.createProduct(product)
    }
}
