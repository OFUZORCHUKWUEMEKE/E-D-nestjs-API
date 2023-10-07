import { BadRequestException, Controller, Get, Param, ParseUUIDPipe, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Roles } from '../common/decorators/roles.decorator';
import { CustomerType } from '../common/dto/common-dto';
import { Request } from 'express';
import { Ireq } from '../auth/dto/auth.dto';
import { User } from '../common/decorators/customer.decorator';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get('/:id')
    async getCart(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await this.cartService.getCart(id)
        } catch (error) {
            throw new BadRequestException(error.response)
        }
    }

    @Roles(CustomerType.REGULAR)
    @Post('')
    async addToCart(product: Product, @User() user) {
        const payload:Ireq = user
        try {
            await this.cartService.addToCart(product,payload)
        } catch (error) {
            throw new BadRequestException(error.response.message)
        }
    }

    @Roles(CustomerType.REGULAR)
    async deleteProduct(@Param('id',ParseUUIDPipe) id:string){
        try {
           return await this.cartService.DeleteProduct(id)
        } catch (error) {
             throw new BadRequestException(error.response)
        }
    }
}
