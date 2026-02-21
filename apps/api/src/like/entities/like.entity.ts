import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Post } from '@/posts/entities/post.entity';

@Entity()
@Index(['user', 'comment'], { unique: true })
@Index(['user', 'post'], { unique: true })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes, { nullable: true })
  comment: Comment;

  @ManyToOne(() => Post, (post) => post.likes, { nullable: true })
  post: Post;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
