import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text' })
  content: string;
  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    type: 'enum',
    enum: ['POST', 'EPISODE'],
  })
  targetType: 'POST' | 'EPISODE';
  @Column({ type: 'uuid' })
  targetId: string;
  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
