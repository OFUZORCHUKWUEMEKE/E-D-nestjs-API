import { DataSourceOptions } from 'typeorm'
import configuration from '../config/config';
import { Customer } from 'src/app/customer/entities/customer.entity';
import { Order } from 'src/app/orders/entities/order.entity';
import { Product } from 'src/app/product/entities/product.entity';

const config = configuration()

export const CLOUDINARY = 'Cloudinary';

export const DbOptions = {
    type: 'postgres',
    host: 'localhost',
    url: config.POSTGRES_URL,
    entities: [
        // __dirname + '/../**/*.entity{.ts,.js}',
        Customer,Order,Product
    ],
    synchronize: true,
}