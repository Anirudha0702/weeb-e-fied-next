import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
  Index,
  JoinColumn,
  Check,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
@Index('idx_comment_postId_createdAt', ['postId', 'createdAt'])
@Index('idx_comment_episodeId_createdAt', ['episodeId', 'createdAt'])
@Index('idx_comment_parentId', ['parentId'])
@Check(
  `("postId" IS NOT NULL AND "episodeId" IS NULL) OR ("postId" IS NULL AND "episodeId" IS NOT NULL)`,
)
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'uuid', nullable: true })
  postId: string | null;

  @Column({ type: 'text', nullable: true })
  episodeId: string | null;

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
