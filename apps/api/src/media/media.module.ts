import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ScrapperService } from 'src/scrapper/scrapper.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, ScrapperService],
})
export class MediaModule {}
