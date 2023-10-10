import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { ProductRepository } from "./product.repository";
import { Repository } from "typeorm";
import { CreateProduct, Product_Type } from "./dto/create-product";
import { ProductType } from "./entities/producttype.entity";
import { UpdateProduct } from "./dto/update-product";


@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository, @InjectRepository(ProductType) private readonly productType: Repository<ProductType>) { }

    async GetProducts(): Promise<Product[]> {
        try {
            return await this.productRepository.findAll({
                relations: {
                    productType: true
                }
            })
        } catch (error) {
            throw new Error()
        }
    }

    async CreateProduct(product: CreateProduct): Promise<Product> {
        const { description, product_type_name } = product
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
            })
        } catch (error) {
            throw new BadRequestException(error.response.message)
        }
    }

    async GetProduct(): Promise<Product[]> {
        try {
            return this.productRepository.findAll({
                relations: {
                    productType: true
                }
            })
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async GetProducttype(): Promise<ProductType[]> {
        try {
            return await this.productType.find({})
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async CreateProductType(product: Product_Type): Promise<ProductType> {
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


    async EditProductType(id: string, body: UpdateProduct) {
        try {
            const productType = await this.productType.findOne({
                where: {
                    id
                }
            })
            if (!productType) throw new ConflictException('Product Type NOT Found')
            await this.productType.update(id, body)
            return {
                message: `Product Type ${productType.name} with ${id} has been Updated Successfully Updated`,
                success: true
            }
        } catch (error) {
            throw new BadRequestException(error?.response?.message)
        }
    }
    
    async DeleteProduct(id: string) {
        try {
            const type = await this.productRepository.findOne({
                where: {
                    id
                }
            })
            if (!type) throw new ConflictException(`Invalid Product with ${id}`)
            await this.productRepository.remove(type)
            return {
                message: 'Deleted Successfully',
                succes: true
            }
        } catch (error) {
            throw new BadRequestException(error.response)
        }
    }
    async DeleteProductType(id: string) {
        try {
            const type = await this.productType.findOne({
                where: {
                    id
                }
            })
            if (!type) throw new ConflictException(`Invalid Product with ${id}`)
            const datas = await this.productRepository.findAll({
                relations: {
                    productType: true
                },
                where: {
                    productType: {
                        id
                    }
                }
            })

            for (const data of datas) {
                await this.productRepository.remove(data)
            }
            return {
                message:"Deleted Successfully",
                success:true
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestException(error.response)
        }
    }
}

