import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  EpisodeCommentQueryDto,
} from './dto/create-comment.dto';
import { User } from '@/common/decorators/user/user.decorator';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentService.create(createCommentDto);
  }
  @Get('episode/:episodeId')
  async findByEpisode(
    @Param('episodeId') episodeId: string,

    @Query() query: EpisodeCommentQueryDto,
    @User() user?: { id: string },
  ) {
    return await this.commentService.findByEpisode(
      episodeId,
      query.limit,
      query.cursor,
      query.sort,
      user?.id,
    );
  }
  @Get('reply/:parentId')
  async findByParent(
    @Param('parentId') parentId: string,
    @Query() query: EpisodeCommentQueryDto,
    @User() user?: { id: string },
  ) {
    return await this.commentService.findByParent(
      parentId,
      query.limit,
      query.cursor,
      query.sort,
      user?.id,
    );
  }
  @Post('like/:commentId')
  async like(
    @Param('commentId') commentId: string,
    @User() user: { id: string },
  ) {
    return await this.commentService.like(commentId, user.id);
  }
  @Post('unlike/:commentId')
  async unlike(
    @Param('commentId') commentId: string,
    @User() user: { id: string },
  ) {
    return await this.commentService.unlike(commentId, user.id);
  }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.commentService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
