import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Like } from '@/like/entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Like])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
