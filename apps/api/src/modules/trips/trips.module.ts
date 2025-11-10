import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TripsRepository } from './trips.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),
    DatabaseModule,
  ],
  controllers: [TripsController],
  providers: [TripsService, TripsRepository],
  exports: [TripsService],
})
export class TripsModule {}
