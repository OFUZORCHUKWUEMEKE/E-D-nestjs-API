import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProduct, Product_Type } from "./dto/create-product";
import { Roles } from "../common/decorators/roles.decorator";
import { CustomerType } from "../common/dto/common-dto";



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

    @Roles(CustomerType.ADMIN)
    @Post('')
    async CreateProduct(@Body() product: CreateProduct) {
        try {
            return await this.productService.CreateProduct(product)
        } catch (error) {
            throw new Error('Product Problems')
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

    @Roles(CustomerType.ADMIN)
    @Post('/product-type')
    async CreateProductType(@Body() product: Product_Type) {
        try {
            return await this.productService.CreateProductType(product)
        } catch (error) {
            throw new Error()
        }
    }
}