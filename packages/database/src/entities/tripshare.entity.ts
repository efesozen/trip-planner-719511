import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Trip } from './trip.entity';
import type { User } from './user.entity';

@Entity({ name: 'trip_shares' })
export class Tripshare extends BaseEntity {


@Column({ name: 'trip_id' })
  tripId!: string;

  @Index('idx_trip_shares_trip_id')
  @ManyToOne('Trip', 'tripshares')
  @JoinColumn({ name: 'trip_id' })
  trip!: Trip;

  @Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_trip_shares_user_id')
  @ManyToOne('User', 'tripshares')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
