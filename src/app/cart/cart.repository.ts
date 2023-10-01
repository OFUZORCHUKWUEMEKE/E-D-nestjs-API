import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "../common/core/repository/base.repository";
import { Repository } from "typeorm";
import { CartRepositoryInterface } from "./cart.interface";
import { Cart } from "./entities/cart.entity";


export class CartRepository extends BaseAbstractRepostitory<Cart> implements CartRepositoryInterface {
    constructor(@InjectRepository(Cart) private readonly cartRepository: Repository<Cart>) {
        super(cartRepository)
    }
}