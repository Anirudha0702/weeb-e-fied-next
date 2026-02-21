import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}
  async like(createLikeDto: CreateLikeDto) {
    try {
      const likeEntry = this.likeRepository.create({
        user: { id: createLikeDto.likedBy },
        ...(createLikeDto.target === 'COMMENT'
          ? { comment: { id: createLikeDto.commentId } }
          : { post: { id: createLikeDto.postId } }),
      });
      return await this.likeRepository.save(likeEntry);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
  async unLike(likeId: string, userId?: string) {
    try {
      const like = await this.likeRepository.findOne({ where: { id: likeId } });
      if (!like) throw new HttpException('Like not found', 404);
      if (userId && like.user.id !== userId) {
        throw new HttpException('Unauthorized to unlike this like', 403);
      }
      await this.likeRepository.remove(like);
      return { message: 'Unliked successfully' };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
