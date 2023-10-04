import { Column, Entity, JoinColumn, OneToOne } from "typeorm"
import { BaseEntity } from "../common/core/entity/base.entity";
import { Customer } from "../customer/entities/customer.entity";

@Entity('wallet')
export class Wallet extends BaseEntity {

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer

    @Column({ default: 0 })
    amount: number
}