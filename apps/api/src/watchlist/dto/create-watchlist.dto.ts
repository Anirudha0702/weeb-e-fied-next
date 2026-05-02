import { IsBoolean, IsEnum, IsInt, IsOptional } from 'class-validator';
import { WatchlistStatus } from '../entities/watchlist.entity';

export class CreateWatchlistDto {
  @IsInt()
  mediaId!: number;
  @IsEnum(WatchlistStatus)
  status!: WatchlistStatus;
  @IsInt()
  @IsOptional()
  progress?: number;
  @IsBoolean()
  @IsOptional()
  remove?: boolean;
}
