import {
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsAlphanumeric,
  IsString,
  Length,
} from 'class-validator';

export class CreateUrlDto {
  @IsUrl(
    { allow_protocol_relative_urls: true },
    { message: 'Invalid URL format' },
  )
  @IsNotEmpty({ message: 'URL is required' })
  url: string;

  @IsOptional()
  @IsString()
  @IsAlphanumeric()
  @Length(1, 30, { message: 'Custom code invalid' })
  code?: string;
}
