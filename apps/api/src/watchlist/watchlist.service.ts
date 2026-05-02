import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchlist } from './entities/watchlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private readonly watchlistRepository: Repository<Watchlist>,
  ) {}
  async upsertWatchlist(
    createWatchlistDto: CreateWatchlistDto,
    userId: string,
  ) {
    try {
      const { mediaId, status, progress, remove } = createWatchlistDto;
      if (remove) {
        await this.watchlistRepository.delete({ userId, mediaId });
        return { ...createWatchlistDto };
      }
      await this.watchlistRepository.upsert(
        {
          mediaId,
          status,
          userId,
          progress,
        },
        ['userId', 'mediaId'],
      );
      return {
        ...createWatchlistDto,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }

  async isAnimeInUserList(userId: string, mediaId: number) {
    try {
      const entry = await this.watchlistRepository.findOne({
        where: { userId, mediaId },
      });
      return entry;
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} watchlist`;
  }

  update(id: number, updateWatchlistDto: UpdateWatchlistDto) {
    return `This action updates a #${id} watchlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} watchlist`;
  }
}
