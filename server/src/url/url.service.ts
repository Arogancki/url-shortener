import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './url.schema.js';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async createShortUrl(originalUrl: string, code?: string): Promise<string> {
    const shortCode = code ?? nanoid(16);
    const newUrl = new this.urlModel({
      originalUrl,
      shortCode,
      visitCounter: 0,
    });
    try {
      await newUrl.save();
    } catch (err) {
      throw new ConflictException('Code already used');
    }

    return shortCode;
  }

  async getOriginalUrl(shortCode: string): Promise<string | null> {
    const url = await this.urlModel.findOneAndUpdate(
      { shortCode },
      { $inc: { visitCounter: 1 } },
    );

    return url?.originalUrl ?? null;
  }
}
