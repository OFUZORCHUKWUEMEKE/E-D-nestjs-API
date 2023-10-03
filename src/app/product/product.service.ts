import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product, ProductType } from './entities/product.entity';
import { CreateProduct, Product_Type } from './dto/create-product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository, @InjectRepository(Product) private productRepo: Repository<Product>, @InjectRepository(ProductType) private readonly type: Repository<ProductType>) { }
    async GetProducts() {
        await this.productRepository.findAll({})
    }

    async GetProductById(id: string): Promise<Product> {
        const product = await this.productRepository.findOneById(id)
        if (!product) {
            throw new HttpException('No Products found with such ID', HttpStatus.BAD_REQUEST)
        }
        return product
    }

    async createProduct(product: CreateProduct) {
        try {
            const newProduct = await this.productRepository.create({

            })
            return newProduct
        } catch (error) {
            throw new HttpException(error, 400)
        }
    }

    async createProductType(product: Product_Type) {
        try {
            const createType = await this.type.create({
                name: product.name,
                description: product.description,
                price: product.price,
                quantity:product.quantity
            })
            return createType
        } catch (error) {
            throw new HttpException(error.message, 400)
        }
    }

    async editProduct(id, body) {
        try {
            const product = this.productRepo.update({ id }, { ...body })
            return product
        } catch (error) {
            throw new HttpException(error, 400)
        }
    }


    async deleteProduct(id: string) {
        try {
            await this.productRepository.Deleteproduct(id)
            return 'Successfully deleted'
        } catch (error) {
            throw new HttpException(error, 400)
        }
    }
}
