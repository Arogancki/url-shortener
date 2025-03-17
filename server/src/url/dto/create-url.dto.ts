import {
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
  @ApiProperty({
    description: 'Proper url where code should lead to',
    example: 'https://deckstats.net/decks',
  })
  @IsUrl(
    { allow_protocol_relative_urls: true },
    { message: 'Invalid URL format' },
  )
  @IsNotEmpty({ message: 'URL is required' })
  url: string;

  @ApiProperty({
    description: 'Optional code used as a short link',
    example: 'myShortLink',
  })
  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  @Length(1, 30, { message: 'Custom code invalid' })
  code?: string;
}
