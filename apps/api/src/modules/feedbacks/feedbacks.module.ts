import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksRepository } from './feedbacks.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    DatabaseModule,
  ],
  controllers: [FeedbacksController],
  providers: [FeedbacksService, FeedbacksRepository],
  exports: [FeedbacksService],
})
export class FeedbacksModule {}
