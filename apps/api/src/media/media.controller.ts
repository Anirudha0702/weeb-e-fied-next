import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { Public } from 'src/common/decorators/public/public.decorator';
import { GetEpisodeDto } from './dto/create-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Public()
  @Post('episode')
  async episode(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    payload: GetEpisodeDto,
  ) {
    try {
      return await this.mediaService.getStrimmingLinks(payload);
    } catch (error) {
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'An unexpected error occurred',
      );
    }
  }
}
