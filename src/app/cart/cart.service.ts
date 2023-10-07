import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './cart.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Ireq } from '../auth/dto/auth.dto';
import { CustomerRepository } from '../customer/customer.repository';

@Injectable()
export class CartService {
    constructor(private readonly cartRepository: CartRepository, @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>, private readonly customerRepository: CustomerRepository) { }

    async getCart(id: string) {
        try {
            const cart = await this.cartRepository.findOneById(id)
            return {
                success: true,
                cart
            }
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async addToCart(product, payload: Ireq) {
        try {
            const customer = await this.customerRepository.findOneById(payload.userId)!
            if (!customer) throw new UnauthorizedException()

            // const productss = await this.getCart(payload.)
            this.cartRepository.create({
                customer,
                product: [...product]
            })
        } catch (error) {
           throw new BadRequestException(error.response)
        }
    }

    async DeleteProduct(id:string){
       try {
          
       } catch (error) {
        
       }
    }

    async DeleteAllProduct(){
        try {
            
        } catch (error) {
            
        }
    }
}
