import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { UrlService } from './url.service.js';
import { ValidationPipe } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto.js';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('url')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @ApiOperation({ summary: 'Create a short link for your url' })
  @ApiResponse({ status: 200, description: 'Shorter link' })
  @ApiResponse({ status: 409, description: 'Code for link already used' })
  @Throttle({ default: { limit: 3, ttl: 5 * 60 * 1000 } })
  async shortenUrl(@Body(new ValidationPipe()) createUrlDto: CreateUrlDto) {
    const shortCode = await this.urlService.createShortUrl(
      createUrlDto.url,
      createUrlDto.code,
    );

    return { shortCode };
  }

  @Get('short/:shortCode')
  @ApiOperation({ summary: 'Redirect from short code to url' })
  @ApiResponse({ status: 200, description: 'Redirect to linked url' })
  @ApiResponse({ status: 404, description: 'Link Not found' })
  @SkipThrottle()
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const originalUrl = await this.urlService.getOriginalUrl(shortCode);

    if (!originalUrl) {
      throw new HttpException('URL not found', HttpStatus.NOT_FOUND);
    }

    return { url: originalUrl };
  }
}
