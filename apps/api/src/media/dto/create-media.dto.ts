import { IsInt, IsString } from 'class-validator';

export class GetEpisodeDto {
  @IsInt()
  anilistId: number;
  @IsInt()
  episodeNo: number;
  @IsString()
  animeName: string;
}
