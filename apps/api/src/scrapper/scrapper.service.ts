import {
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import { AppLogger } from 'src/common/logger/app.logger';

@Injectable()
export class ScrapperService {
  private readonly client: AxiosInstance;
  private readonly ajaxEndpoint: string;
  constructor(private readonly logger: AppLogger) {
    this.client = axios.create({
      timeout: 15000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    this.ajaxEndpoint = 'https://gogoanimes.cv/wp-admin/admin-ajax.php';
  }
  async getStreamLinks(episodePageLink: string) {
    try {
      // const url = 'https://hianime.to/home';
      const { data, status } = await this.client.get<string>(episodePageLink, {
        timeout: 15000,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });

      if (status >= 400) {
        throw new Error(`HTTP ${status}`);
      }

      const $ = cheerio.load(data);
      const res: string[] = [];
      $('ul li a').each((_, el) => {
        const dataVideo = $(el).attr('data-video');
        if (!dataVideo) return;

        const decoded = dataVideo
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"');

        const iframe$ = cheerio.load(decoded);
        const src = iframe$('iframe').attr('src');

        res.push(src ?? '');
      });

      return {
        dub: res.filter((link) => link.endsWith('dub'))[0],
        sub: res.filter((link) => link.endsWith('sub'))[0],
      };
    } catch (err) {
      const error = err as AxiosError;

      if (error.code === 'ECONNRESET') {
        throw new ServiceUnavailableException(
          'Target server closed the connection (ECONNRESET)',
        );
      }

      throw new ServiceUnavailableException(
        error.message || 'Failed to fetch page',
      );
    }
  }
  async getGogoInfoPageURL(query: string) {
    const url = `${process.env.SCRAP_ENDPOINT}/?s=${encodeURIComponent(query)}`;
    const { data, status } = await this.client.get<string>(url, {
      timeout: 15000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (status >= 400) {
      throw new NotFoundException(
        `Unable to search  by the provided query:  ${query}`,
      );
    }
    const $ = cheerio.load(data);
    const searchResults = $('ul.items li');
    if (searchResults.length === 0)
      throw new NotFoundException(
        `No results found based on  existing query :${query}`,
      );
    /**
     * this infoNode assign logic must modify latter
     */
    const infoNode = searchResults.length > 1 ? 1 : 0;

    const node = searchResults.eq(infoNode);
    const resUrl = node.find('div > a').attr('href');
    return { url: resUrl };
  }
  async getEpisodePageLink(
    infoPageLink: string,
    episodeNo: number,
  ): Promise<{
    link: string | undefined;
    totalPublishedEpisodes: number;
  }> {
    this.logger.debug(`fetching url : ${infoPageLink}`, ScrapperService.name);
    const { data, status } = await this.client.get<string>(infoPageLink, {
      timeout: 15000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (status >= 400) {
      throw new NotFoundException(`Unable to load the link`);
    }
    const $ = cheerio.load(data);
    const paginatedEpisodeRange = $('ul#episode_page li');
    if (paginatedEpisodeRange.length === 0)
      throw new NotFoundException(`Episode not found`);
    let options: { start: string; end: string; seri: string } | null = null;
    let maxEpisode = 0;
    paginatedEpisodeRange.each((_, el) => {
      const a = $(el).find('a');

      if (!a.length) return;
      const text = a.text().trim();

      const [startStr, endStr] = text.split('-');
      const seri = a.attr('data-seri');
      if (!startStr || !endStr || !seri) return;

      const start = Number(startStr);
      const end = Number(endStr);
      if (end > maxEpisode) maxEpisode = end;
      const isInRange = episodeNo >= start && episodeNo <= end;

      if (isInRange) {
        options = {
          start: startStr,
          end: endStr,
          seri: seri,
        };
        return false;
      }
    });
    if (!options) {
      throw new NotFoundException('Episode not found.');
    }
    const scriptContent = $('script')
      .filter((_, el) => !!$(el).html()?.includes('nonce'))
      .html();

    const nonceMatch = scriptContent?.match(
      /nonce["']?\s*:\s*["']([^"']+)["']/,
    );
    const nonce = nonceMatch ? nonceMatch[1] : null;
    if (!nonce) throw new NotFoundException('Nonce not found');
    const { start, end, seri } = options;
    const form = new FormData();
    form.append('action', 'load_episode_range');
    form.append('range_start', start);
    form.append('range_end', end);
    form.append('seri_id', seri);
    form.append('nonce', nonce);

    this.logger.debug(`fetching ajx`, ScrapperService.name);
    const res = await this.client.post<{ success: boolean; data: string }>(
      this.ajaxEndpoint,
      form,
      {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Accept: '*/*',
          Origin: 'https://gogoanimes.cv',
          Referer: 'https://gogoanimes.cv/anime/naruto-2002/',
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
          Cookie: 'ts_viewed_685=1; ts_viewed_17306=1',
        },
      },
    );
    if (res.status >= 400 || !res.data.success) {
      throw new ConflictException('Not able to get episode');
    }
    const _$ = cheerio.load(res.data.data);
    const href = _$(`a[href$="episode-${episodeNo}/"]`).attr('href');
    this.logger.debug(res.data, ScrapperService.name);
    return {
      link: href,
      totalPublishedEpisodes: maxEpisode,
    };
  }
}
