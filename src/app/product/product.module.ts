import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductType } from './entities/producttype.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductType])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  exports: [ProductRepository]
})
  export class ProductModule {}
