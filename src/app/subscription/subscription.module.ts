import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription.entity';
import { SubscriptionRepository } from './subscription.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService,SubscriptionRepository],
  exports:[SubscriptionRepository]
})
export class SubscriptionModule {}
