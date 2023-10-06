import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product} from "./entities/product.entity";
import { ProductRepository } from "./product.repository";
import { Repository } from "typeorm";
import { Product_Type } from "./dto/create-product";
import { ProductType } from "./entities/producttype.entity";


@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository, @InjectRepository(ProductType) private readonly productType: Repository<ProductType>) { }

    async GetProducts() {
        try {
            return await this.productRepository.findAll({})
        } catch (error) {
            throw new Error()
        }
    }

    async CreateProduct() {

    }

    async GetProducttype() {
        try {
            return await this.productType.find({})
        } catch (error) {
            throw new Error()
        }
    }

    async CreateProductType(product: Product_Type) {
        try {
            return await this.productType.save({
                name:product.name,
                description:product.description,
                price:product.price,
                quantity:product.quantity
            })
        } catch (error) {
            throw new ConflictException()
        }
    }
}