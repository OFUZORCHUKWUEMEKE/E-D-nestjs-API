import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "../common/core/repository/base.repository";
import { Repository } from "typeorm";
import { Product } from "./entities/product.entity";
import { ProductRepositoryInterface } from "./product.interface";


export class ProductRepository extends BaseAbstractRepostitory<Product> implements ProductRepositoryInterface {
    constructor(@InjectRepository(Product) private readonly customerRepository: Repository<Product>){
        super(customerRepository)
    }

   
}