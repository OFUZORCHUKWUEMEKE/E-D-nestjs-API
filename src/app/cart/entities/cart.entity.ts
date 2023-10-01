import { BaseEntity } from "src/app/common/core/entity/base.entity"
import { Customer } from "src/app/customer/entities/customer.entity"
import { Product } from "src/app/product/entities/product.entity"
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm"

@Entity('cart')
export class Cart extends BaseEntity {
    @OneToMany(() => Product, (product) => product.id, { cascade: true })
    @JoinColumn()
    product: Product[]
    // 
    @ManyToOne(() => Customer, (customer) => customer.id, { cascade: true })
    @JoinColumn()
    customer: Customer

}