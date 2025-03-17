import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Url extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true, unique: true })
  shortCode: string;

  @Prop({ default: 0 })
  visitCounter: number;

  @Prop({ required: false })
  creatorUserId: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
