import { IsIn, IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class CreateLikeDto {
  @IsIn(['COMMENT', 'POST'])
  target: 'COMMENT' | 'POST';
  @ValidateIf((o) => o.target === 'COMMENT')
  @IsNotEmpty()
  @IsUUID()
  commentId?: string;

  @ValidateIf((o) => o.target === 'POST')
  @IsNotEmpty()
  @IsUUID()
  postId?: string;

  @IsUUID()
  likedBy: string;
}
