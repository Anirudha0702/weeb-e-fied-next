import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import {
  FindOptionsWhere,
  IsNull,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';
import { Like } from '@/like/entities/like.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}
  async create(commentIfno: CreateCommentDto) {
    try {
      if (commentIfno.parentId) {
        const parentComment = await this.findCommentById(commentIfno.parentId);
        if (parentComment.parentId)
          throw new BadRequestException('Replies to replies are not allowed');
      }
      const commentEntry = this.commentRepository.create({
        content: commentIfno.comment,
        gif: commentIfno.gif,
        parentId: commentIfno.parentId,
        userId: commentIfno.createdBy,
        ...(commentIfno.target === 'EPISODE'
          ? { episodeId: commentIfno.episodeId }
          : { postId: commentIfno.postId }),
      });
      const comment = await this.commentRepository.save(commentEntry);
      if (commentIfno.parentId)
        await this.incrementReplyCount(commentIfno.parentId);
      return comment;
    } catch (error: unknown) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  async findByEpisode(
    episodeId: string,
    limit: number,
    cursor?: string,
    sort?: 'new' | 'old',
    currentUserId?: string,
  ) {
    try {
      const isNew = sort === 'new';
      const where: FindOptionsWhere<Comment> = {
        episodeId,
        parentId: IsNull(),
        postId: IsNull(),
      };
      if (cursor) {
        where.createdAt = isNew
          ? LessThan(new Date(cursor))
          : MoreThan(new Date(cursor));
      }
      const comments = await this.commentRepository.find({
        where,
        order: {
          createdAt: isNew ? 'DESC' : 'ASC',
          id: isNew ? 'DESC' : 'ASC',
        },
        relations: {
          user: true,
        },
        select: {
          user: {
            id: true,
            profilePicture: true,
            name: true,
          },
        },
        take: limit + 1,
      });
      const hasNextPage = comments.length > limit;
      const data = hasNextPage ? comments.slice(0, limit) : comments;
      const nextCursor = hasNextPage
        ? data[data.length - 1].createdAt.toISOString()
        : null;
      const commentIds = data.map((c) => c.id);
      const userId = currentUserId ?? '0'; //0 is not a valid uuid
      const map = await this.likeRepository
        .createQueryBuilder('like')
        .select('like.commentId', 'commentId')
        .addSelect('COUNT(like.id)', 'likeCount')
        .addSelect('BOOL_OR(like.userId = :userId)', 'likedByCurrentUser')
        .where('like.commentId IN (:...commentIds)', { commentIds })
        .setParameter('userId', userId)
        .groupBy('like.commentId')
        .getRawMany<{
          commentId: string;
          likeCount: string;
          likedByCurrentUser: boolean;
        }>();

      const dataWithLikes = data.map((comment) => {
        return {
          ...comment,
          likeCount:
            map.find((m) => m.commentId === comment.id)?.likeCount ?? 0,
          likedByCurrentUser:
            map.find((m) => m.commentId === comment.id)?.likedByCurrentUser ??
            false,
        };
      });
      return {
        comments: dataWithLikes,
        hasNextPage,
        nextCursor,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  async findByParent(
    parentId: string,
    limit: number,
    cursor?: string,
    sort?: 'new' | 'old',
    currentUserId?: string,
  ) {
    try {
      const isNew = sort === 'new';
      const where: FindOptionsWhere<Comment> = {
        parentId,
      };
      if (cursor) {
        where.createdAt = isNew
          ? LessThan(new Date(cursor))
          : MoreThan(new Date(cursor));
      }
      const comments = await this.commentRepository.find({
        where,
        order: {
          createdAt: isNew ? 'DESC' : 'ASC',
          id: isNew ? 'DESC' : 'ASC',
        },
        relations: {
          user: true,
        },
        select: {
          user: {
            id: true,
            profilePicture: true,
            name: true,
          },
        },
        take: limit + 1,
      });
      const hasNextPage = comments.length > limit;
      const data = hasNextPage ? comments.slice(0, limit) : comments;
      const nextCursor = hasNextPage
        ? data[data.length - 1].createdAt.toISOString()
        : null;
      const commentIds = data.map((c) => c.id);
      const userId = currentUserId ?? '0'; //0 is not a valid uuid
      const map = await this.likeRepository
        .createQueryBuilder('like')
        .select('like.commentId', 'commentId')
        .addSelect('COUNT(like.id)', 'likeCount')
        .addSelect('BOOL_OR(like.userId = :userId)', 'likedByCurrentUser')
        .where('like.commentId IN (:...commentIds)', { commentIds })
        .setParameter('userId', userId)
        .groupBy('like.commentId')
        .getRawMany<{
          commentId: string;
          likeCount: string;
          likedByCurrentUser: boolean;
        }>();

      const dataWithLikes = data.map((comment) => {
        return {
          ...comment,
          likeCount:
            map.find((m) => m.commentId === comment.id)?.likeCount ?? 0,
          likedByCurrentUser:
            map.find((m) => m.commentId === comment.id)?.likedByCurrentUser ??
            false,
        };
      });
      return {
        comments: dataWithLikes,
        hasNextPage,
        nextCursor,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  async like(commentId: string, userId: string) {
    try {
      const existingLike = await this.likeRepository.findOne({
        where: {
          comment: { id: commentId },
          user: {
            id: userId,
          },
        },
      });
      if (existingLike) {
        return { liked: true };
      } else {
        const likeEntry = this.likeRepository.create({
          comment: { id: commentId },
          user: { id: userId },
        });
        await this.likeRepository.save(likeEntry);
        return { liked: true };
      }
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  async unlike(commentId: string, userId: string) {
    try {
      await this.likeRepository.delete({
        comment: { id: commentId },
        user: {
          id: userId,
        },
      });
      return { liked: false };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  findAll() {
    return `This action returns all comment`;
  }

  findCommentById(id: string) {
    try {
      return this.commentRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }

  update(id: string) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
  async incrementReplyCount(commentId: string) {
    try {
      await this.commentRepository.increment(
        { id: commentId },
        'replyCount',
        1,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  async decrementReplyCount(commentId: string) {
    try {
      await this.commentRepository.decrement(
        { id: commentId },
        'replyCount',
        1,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
}
