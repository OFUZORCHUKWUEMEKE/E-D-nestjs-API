import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { BaseEntity } from "../common/core/entity/base.entity";
import { Customer } from "../customer/entities/customer.entity";

@Entity('Wallet')
export class Wallet extends BaseEntity {

    @JoinColumn()
    @OneToOne(() => Customer, customer => customer.id)
    customer: Customer

    @Column({ default: 0 })
    amount: number

}