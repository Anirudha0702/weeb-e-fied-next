import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  IsNotEmpty,
  IsIn,
  IsEnum,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsUUID()
  @IsOptional()
  gif?: string;

  @IsUUID()
  createdBy: string;

  @IsString()
  comment: string;

  @IsIn(['EPISODE', 'POST'])
  target: 'EPISODE' | 'POST';

  @ValidateIf((o) => o.target === 'EPISODE')
  @IsNotEmpty()
  @IsString()
  episodeId?: string;

  @ValidateIf((o) => o.target === 'POST')
  @IsNotEmpty()
  @IsUUID()
  postId?: string;
}

export class EpisodeCommentQueryDto {
  @IsEnum(['new', 'old'])
  @IsOptional()
  sort?: 'new' | 'old' = 'new';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 20;

  @IsOptional()
  cursor?: string;
}
