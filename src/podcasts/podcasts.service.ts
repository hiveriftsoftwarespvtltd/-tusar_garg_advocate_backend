import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Podcast, PodcastDocument, PodcastStatus } from './schemas/podcast.schema';
import { 
  extractYouTubeVideoId, 
  buildYouTubeEmbedUrl, 
  buildYouTubeThumbnailUrl, 
  buildYouTubeWatchUrl 
} from './youtube.util';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectModel(Podcast.name)
    private readonly podcastModel: Model<PodcastDocument>,
  ) {}

  /**
   * Public: Retrieve published podcasts.
   * Latest published first, sorted by displayOrder ASC, then publishedAt DESC.
   */
  async findPublished(limit?: number, page: number = 1): Promise<{
    items: Podcast[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const query = { status: PodcastStatus.PUBLISHED };
    const parsedLimit = limit && Number(limit) > 0 ? Number(limit) : 0;
    const parsedPage = Math.max(1, Number(page) || 1);

    const total = await this.podcastModel.countDocuments(query).exec();

    let queryBuilder = this.podcastModel
      .find(query)
      .sort({ displayOrder: 1, publishedAt: -1, createdAt: -1 });

    if (parsedLimit > 0) {
      queryBuilder = queryBuilder
        .skip((parsedPage - 1) * parsedLimit)
        .limit(parsedLimit);
    }

    const items = await queryBuilder.lean().exec();

    return {
      items: items.map(item => this.normalizePodcast(item)),
      total,
      page: parsedPage,
      totalPages: parsedLimit > 0 ? Math.ceil(total / parsedLimit) : 1,
    };
  }

  /**
   * Public: Retrieve single published podcast by ID.
   */
  async findOnePublished(id: string): Promise<Podcast> {
    const podcast = await this.podcastModel
      .findOne({ _id: id, status: PodcastStatus.PUBLISHED })
      .lean()
      .exec();

    if (!podcast) {
      throw new NotFoundException('Published podcast not found');
    }

    return this.normalizePodcast(podcast);
  }

  /**
   * Admin: Retrieve all podcasts (Draft, Published, Unpublished).
   */
  async findAllAdmin(): Promise<Podcast[]> {
    const list = await this.podcastModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return list.map(item => this.normalizePodcast(item));
  }

  /**
   * Admin: Get single podcast for editing.
   */
  async findOneAdmin(id: string): Promise<Podcast> {
    const podcast = await this.podcastModel.findById(id).lean().exec();
    if (!podcast) {
      throw new NotFoundException('Podcast not found');
    }
    return this.normalizePodcast(podcast);
  }

  /**
   * Admin: Create a new podcast.
   */
  async create(dto: {
    title: string;
    description?: string;
    youtubeUrl: string;
    status?: PodcastStatus;
    displayOrder?: number;
    featured?: boolean;
    duration?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  }): Promise<Podcast> {
    if (!dto.title || !dto.title.trim()) {
      throw new BadRequestException('Podcast title is required');
    }

    if (!dto.youtubeUrl || !dto.youtubeUrl.trim()) {
      throw new BadRequestException('YouTube URL is required');
    }

    const videoId = extractYouTubeVideoId(dto.youtubeUrl);
    if (!videoId) {
      throw new BadRequestException(
        'Invalid YouTube URL. Please provide a valid YouTube watch, short, or share link.'
      );
    }

    const status = dto.status && Object.values(PodcastStatus).includes(dto.status)
      ? dto.status
      : PodcastStatus.DRAFT;

    const publishedAt = status === PodcastStatus.PUBLISHED ? new Date() : undefined;

    const keywords = Array.isArray(dto.metaKeywords) ? [...dto.metaKeywords] : [];
    if (!keywords.includes('Advocate on Record Tushar Garg')) {
      keywords.unshift('Advocate on Record Tushar Garg');
    }

    const newPodcast = new this.podcastModel({
      title: dto.title.trim(),
      description: (dto.description || '').trim(),
      youtubeUrl: buildYouTubeWatchUrl(videoId),
      youtubeVideoId: videoId,
      thumbnailUrl: buildYouTubeThumbnailUrl(videoId),
      embedUrl: buildYouTubeEmbedUrl(videoId),
      status,
      displayOrder: Number(dto.displayOrder) || 0,
      featured: Boolean(dto.featured),
      duration: dto.duration || '',
      publishedAt: publishedAt || new Date(),
      metaTitle: dto.metaTitle || `${dto.title.trim()} | Advocate Tushar Garg Podcast`,
      metaDescription: dto.metaDescription || dto.description || '',
      metaKeywords: keywords,
    });

    return (await newPodcast.save()).toObject();
  }

  /**
   * Admin: Update an existing podcast.
   */
  async update(id: string, dto: {
    title?: string;
    description?: string;
    youtubeUrl?: string;
    status?: PodcastStatus;
    displayOrder?: number;
    featured?: boolean;
    duration?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  }): Promise<Podcast> {
    const existing = await this.podcastModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Podcast not found');
    }

    const updatePayload: any = {};

    if (dto.title !== undefined) {
      if (!dto.title.trim()) {
        throw new BadRequestException('Podcast title cannot be empty');
      }
      updatePayload.title = dto.title.trim();
    }

    if (dto.description !== undefined) {
      updatePayload.description = dto.description.trim();
    }

    if (dto.youtubeUrl !== undefined && dto.youtubeUrl.trim() !== '') {
      const videoId = extractYouTubeVideoId(dto.youtubeUrl);
      if (!videoId) {
        throw new BadRequestException('Invalid YouTube URL provided.');
      }
      updatePayload.youtubeVideoId = videoId;
      updatePayload.youtubeUrl = buildYouTubeWatchUrl(videoId);
      updatePayload.thumbnailUrl = buildYouTubeThumbnailUrl(videoId);
      updatePayload.embedUrl = buildYouTubeEmbedUrl(videoId);
    }

    if (dto.status !== undefined && Object.values(PodcastStatus).includes(dto.status)) {
      updatePayload.status = dto.status;
      if (dto.status === PodcastStatus.PUBLISHED && existing.status !== PodcastStatus.PUBLISHED) {
        updatePayload.publishedAt = new Date();
      }
    }

    if (dto.displayOrder !== undefined) {
      updatePayload.displayOrder = Number(dto.displayOrder) || 0;
    }

    if (dto.featured !== undefined) {
      updatePayload.featured = Boolean(dto.featured);
    }

    if (dto.duration !== undefined) {
      updatePayload.duration = dto.duration;
    }

    if (dto.metaTitle !== undefined) updatePayload.metaTitle = dto.metaTitle;
    if (dto.metaDescription !== undefined) updatePayload.metaDescription = dto.metaDescription;

    if (dto.metaKeywords !== undefined) {
      const kws = Array.isArray(dto.metaKeywords) ? [...dto.metaKeywords] : [];
      if (!kws.includes('Advocate on Record Tushar Garg')) {
        kws.unshift('Advocate on Record Tushar Garg');
      }
      updatePayload.metaKeywords = kws;
    }

    const updated = await this.podcastModel
      .findByIdAndUpdate(id, { $set: updatePayload }, { new: true })
      .lean()
      .exec();

    return this.normalizePodcast(updated);
  }

  /**
   * Admin: Quick status change (Draft / Published / Unpublished).
   */
  async updateStatus(id: string, status: PodcastStatus): Promise<Podcast> {
    if (!Object.values(PodcastStatus).includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}. Must be DRAFT, PUBLISHED, or UNPUBLISHED.`);
    }

    const existing = await this.podcastModel.findById(id).exec();
    if (!existing) {
      throw new NotFoundException('Podcast not found');
    }

    const updatePayload: any = { status };
    if (status === PodcastStatus.PUBLISHED && existing.status !== PodcastStatus.PUBLISHED) {
      updatePayload.publishedAt = new Date();
    }

    const updated = await this.podcastModel
      .findByIdAndUpdate(id, { $set: updatePayload }, { new: true })
      .lean()
      .exec();

    return this.normalizePodcast(updated);
  }

  /**
   * Admin: Delete podcast.
   */
  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const deleted = await this.podcastModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Podcast not found');
    }
    return { success: true, message: 'Podcast deleted successfully' };
  }

  private normalizePodcast(item: any): any {
    if (!item) return null;
    const obj = item.toObject ? item.toObject() : { ...item };
    const kws = Array.isArray(obj.metaKeywords) ? [...obj.metaKeywords] : [];
    if (!kws.includes('Advocate on Record Tushar Garg')) {
      kws.unshift('Advocate on Record Tushar Garg');
    }
    obj.metaKeywords = kws;
    return obj;
  }
}
