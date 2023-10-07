import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
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
            throw new BadRequestException(error.response)
        }
    }

    @Roles(CustomerType.ADMIN)
    @Post('')
    async CreateProduct(@Body() product: CreateProduct) {
        try {
            return await this.productService.CreateProduct(product)
        } catch (error) {
            throw new BadRequestException(error.response.message)
        }
    }

    @Get('/product-type')
    async GetProductTypes() {
        try {
            return await this.productService.GetProducttype()
        } catch (error) {
            throw new BadRequestException(error.response.message)
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

    @Roles(CustomerType.ADMIN)
    @Patch('/edit-product/:id')
    async editProductType(@Param('id', ParseUUIDPipe) id: string, @Body() body) {
        try {
            return await this.productService.EditProductType(id, body)
        } catch (error) {
             throw new BadRequestException(error.response.message)
        }
    }

    @Roles(CustomerType.ADMIN)
    @Delete('delete/:id')
    async DeleteProduct(@Param('id',ParseUUIDPipe) id:string){
        try {
            return await this.productService.DeleteProductType(id)
        } catch (error) {
            throw new BadRequestException(error.response.message)
        }
    }
}