import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum Privacy {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}

export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  // add more as needed
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column({ unique: true })
  username: string;
  @Column()
  name: string;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/dnmshy1ag/image/upload/v1763277858/flat-design-male-female-symbols_23-2149288474_yhj2i1.webp',
  })
  profilePicture: string;

  @Column({
    nullable: true,
    default:
      'https://res.cloudinary.com/dnmshy1ag/image/upload/v1763277703/360_F_1058923741_Ug7YblqBl7rRxNeJ5iOxvONEZys87NqC_ebaw9d.webp',
  })
  coverPicture: string;

  @Column({ nullable: true, length: 160 })
  bio: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @Column({ default: false })
  createdByOauth: boolean;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isBlocked: boolean;
  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;
}
