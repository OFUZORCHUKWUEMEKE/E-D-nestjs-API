import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product';
import { UpdateProduct } from './dto/update-product';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CustomerType } from '../common/dto/common-dto';

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


    @Roles(CustomerType.ADMIN)
    @Post('/')
    async CreateProduct(product: CreateProduct) {
        return await this.productService.createProduct(product)
    }

    @Roles(CustomerType.ADMIN)
    @Put('/edit-product/:id')
    async EditProduct(@Param('id') id: string, @Body() body: UpdateProduct) {
        await this.productService.editProduct(id, body)
    }

    @Roles(CustomerType.ADMIN)
    @Delete(':id')
    async DeleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
        return await this.productService.deleteProduct(id)
    }
}
