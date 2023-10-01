import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
    constructor(private readonly cartRepository: CartRepository) { }

    async addToCart() {
        // this.cartRepository.create({
        //  product:
        // })
    }
}
