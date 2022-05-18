import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  DoB: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
