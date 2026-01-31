import { Injectable, NotFoundException } from '@nestjs/common';
import { GetEpisodeDto } from './dto/create-media.dto';
import { ScrapperService } from '../scrapper/scrapper.service';

@Injectable()
export class MediaService {
  constructor(private readonly scrapperService: ScrapperService) {}
  async dummy() {
    return this.scrapperService.getStreamLinks('');
  }
  async getStrimmingLinks(info: GetEpisodeDto) {
    const infoPageUrl = await this.scrapperService.getGogoInfoPageURL(
      info.animeName,
    );
    if (!infoPageUrl || !infoPageUrl.url)
      throw new NotFoundException('Info Page not found');
    const episodesPage = await this.scrapperService.getEpisodePageLink(
      infoPageUrl.url,
      info.episodeNo,
    );

    if (!episodesPage.link)
      throw new NotFoundException('Episode Page not found');

    const links = await this.scrapperService.getStreamLinks(episodesPage.link);
    return {
      links,
      publishedEpisodes: episodesPage.totalPublishedEpisodes,
    };
  }
}
