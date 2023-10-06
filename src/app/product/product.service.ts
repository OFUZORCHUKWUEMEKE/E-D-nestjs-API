import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductRepository } from "./product.repository";
import { Repository } from "typeorm";
import { CreateProduct, Product_Type } from "./dto/create-product";
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

    async CreateProduct(product: CreateProduct) {
        const { description, product_type_name, quantity_per_crate } = product
        try {
            const type = await this.productType.findOne({
                where: {
                    name: product_type_name
                }
            })
            if (!type) throw new ConflictException('ProductType not Found / Invalid Product Type')
            return await this.productRepository.save({
                description,
                productType: type,
                quantity_per_crate
            })
        } catch (error) {
            // console.log(error.response)
            // throw new Error(error.response.message)
        }
    }

    async GetProduct() {
        try {
            return this.productRepository.findAll({
                relations: {
                    productType: true
                }
            })
        } catch (error) {
            throw new Error(error.response.message)
        }
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
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity
            })
        } catch (error) {
            throw new ConflictException()
        }
    }
}