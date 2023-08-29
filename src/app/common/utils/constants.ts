import { DataSourceOptions } from 'typeorm'
import configuration from '../config/config';

const config = configuration()

export const CLOUDINARY = 'Cloudinary';

export const DbOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    url: config.POSTGRES_URL,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
}