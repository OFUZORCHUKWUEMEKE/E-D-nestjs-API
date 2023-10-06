import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product_Type } from "./dto/create-product";



@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async GetProducts() {
        try {
            return await this.productService.GetProducts()
        } catch (error) {
            throw new Error()
        }
    }

    @Get('/product-type')
    async GetProductTypes() {
        try {
            return await this.productService.GetProducttype()
        } catch (error) {
            throw new Error()
        }
    }

    @Post('/product-type')
    async CreateProductType(@Body() product: Product_Type) {
        try {
            return await this.productService.CreateProductType(product)
        } catch (error) {
            throw new Error()
        }
    }
}