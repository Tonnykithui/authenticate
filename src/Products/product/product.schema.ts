import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  Name: string;

  @Prop()
  Manufacturer: string;

  @Prop()
  Cost: number;

  @Prop()
  YearOfManufacture: Date;

  @Prop()
  Description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
