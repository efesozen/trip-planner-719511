import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Trip } from './trip.entity';
import type { User } from './user.entity';

@Entity({ name: 'feedbacks' })
export class Feedback extends BaseEntity {
  @Column({ type: 'integer' })
  rating!: number;

  @Column({ nullable: true })
  comment?: string;


@Column({ name: 'trip_id' })
  tripId!: string;

  @Index('idx_feedbacks_trip_id')
  @ManyToOne('Trip', 'feedbacks')
  @JoinColumn({ name: 'trip_id' })
  trip!: Trip;

  @Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_feedbacks_user_id')
  @ManyToOne('User', 'feedbacks')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
