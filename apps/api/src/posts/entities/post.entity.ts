import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}
export enum PostPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
  FOLLOWER_ONLY = 'follower_only',
}
@Index('idx_post_user_created', ['user', 'createdAt'])
@Index('idx_post_privacy', ['privacy'])
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true, type: 'text', default: [], array: true })
  imageUrls: string[];
  @Column({ nullable: true, type: 'text', default: [], array: true })
  videoUrls: string[];

  @Column({ type: 'text', enum: PostPrivacy, default: 'public' })
  privacy: PostPrivacy;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
