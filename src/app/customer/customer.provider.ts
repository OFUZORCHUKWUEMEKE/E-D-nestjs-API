import { DataSource } from 'typeorm'
import { Customer } from './entities/customer.entity'
import { Db_Constants } from '../common/dto/common-dto'

export const CustomerProvider = [
    {
        provide: Db_Constants.CUSTOMER,
        useFactory: (datasource: DataSource) => datasource.getRepository(Customer),
        inject: [Db_Constants.DATABASE]
    }
]