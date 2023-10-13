import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstractRepostitory } from "../common/core/repository/base.repository";
import { Repository } from "typeorm";
import { Subscription } from "./subscription.entity";
import { SubscriptionRepositoryInterface } from "./subscription.inteface";


export class SubscriptionRepository extends BaseAbstractRepostitory<Subscription> implements SubscriptionRepositoryInterface {
    constructor(@InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>) {
        super(subscriptionRepository)
    }
}