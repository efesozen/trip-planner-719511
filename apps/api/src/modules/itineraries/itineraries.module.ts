import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerary } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { ItinerarysController } from './itineraries.controller';
import { ItinerarysService } from './itineraries.service';
import { ItinerarysRepository } from './itineraries.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerary]),
    DatabaseModule,
  ],
  controllers: [ItinerarysController],
  providers: [ItinerarysService, ItinerarysRepository],
  exports: [ItinerarysService],
})
export class ItinerarysModule {}
