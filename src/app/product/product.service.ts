import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './entities/product.entity';
import { CreateProduct } from './dto/create-product';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository, @InjectRepository(Product) private productRepo: Repository<Product>) { }
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

    async createProduct(product) {
        try {
            const newProduct = await this.productRepository.create(product)
            return newProduct
        } catch (error) {
            throw new HttpException(error, 400)
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
}
