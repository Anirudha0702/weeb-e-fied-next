import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { User } from '@/common/decorators/user/user.decorator';
@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Put('update')
  async create(
    @User() user: { id: string },
    @Body() createWatchlistDto: CreateWatchlistDto,
  ) {
    return await this.watchlistService.upsertWatchlist(
      createWatchlistDto,
      user.id,
    );
  }

  @Get('inlist/:mediaId')
  async isInUsersList(
    @User() user: { id: string },
    @Param('mediaId') mediaId: number,
  ) {
    return await this.watchlistService.isAnimeInUserList(user.id, mediaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.watchlistService.findOne(+id);
  }
}
