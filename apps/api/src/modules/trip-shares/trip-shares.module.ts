import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tripshare } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { TripsharesController } from './tripshares.controller';
import { TripsharesService } from './tripshares.service';
import { TripsharesRepository } from './tripshares.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tripshare]),
    DatabaseModule,
  ],
  controllers: [TripsharesController],
  providers: [TripsharesService, TripsharesRepository],
  exports: [TripsharesService],
})
export class TripsharesModule {}
