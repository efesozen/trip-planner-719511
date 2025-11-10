import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'trips' })
export class Trip extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp with time zone', name: 'start_date' })
  @Index('idx_trips_start_date')
  startDate!: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_date' })
  @Index('idx_trips_end_date')
  endDate!: Date;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_trips_user_id')
  @ManyToOne('User', 'trips')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
