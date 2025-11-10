import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Trip } from './trip.entity';

@Entity({ name: 'itineraries' })
export class Itinerary extends BaseEntity {
  @Column({ type: 'timestamp with time zone' })
  @Index('idx_itineraries_date')
  date!: Date;

  @Column({ type: 'jsonb', nullable: true })
  activities?: Record<string, unknown>;


@Column({ name: 'trip_id' })
  tripId!: string;

  @Index('idx_itineraries_trip_id')
  @ManyToOne('Trip', 'itineraries')
  @JoinColumn({ name: 'trip_id' })
  trip!: Trip;
}
