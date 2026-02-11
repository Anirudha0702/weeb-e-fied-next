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
import { UpdateCommentDto } from './dto/update-comment.dto';
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
  ) {
    return await this.commentService.findByEpisode(
      episodeId,
      query.limit,
      query.cursor,
      query.sort,
    );
  }
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
