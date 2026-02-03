import {
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  IsNotEmpty,
  IsIn,
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
