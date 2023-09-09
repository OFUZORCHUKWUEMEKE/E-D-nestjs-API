import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }
    async GetProducts() {
        await this.productRepository.findAll({})
    }

    async GetProductById(id: string) :Promise<Product>{
        const product = await this.productRepository.findOneById(id)
        if (!product) {
            throw new HttpException('No Products found with such ID', HttpStatus.BAD_REQUEST)
        }
        return product
    }

    async createProduct(product) {
        
    }
}
