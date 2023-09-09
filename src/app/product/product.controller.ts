import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product';
import { UpdateProduct } from './dto/update-product';
import { RolesGuard } from '../common/guard/roles.guard';

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
    
    @Put('/edit-product/:id')
    async EditProduct(@Param('id') id: string, @Body() body: UpdateProduct) {
        await this.productService.editProduct(id, body)
    }
}
