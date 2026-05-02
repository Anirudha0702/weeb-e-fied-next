import { User } from '@/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
export enum WatchlistStatus {
  WATCHING = 'watching',
  COMPLETED = 'completed',
  ONHOLD = 'on-hold',
  PLANNED = 'planned',
  DROPPED = 'dropped',
}
@Entity()
@Index(['userId', 'status'])
@Index(['userId', 'mediaId'], { unique: true })
export class Watchlist {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  mediaId!: number;

  @Column({ type: 'enum', enum: WatchlistStatus })
  status!: WatchlistStatus;

  @Column({ nullable: true })
  progress!: number;

  @ManyToOne(() => User, (user) => user.watchlist, { onDelete: 'CASCADE' })
  user!: User;

  @Column({ type: 'uuid' })
  userId!: string;
}
