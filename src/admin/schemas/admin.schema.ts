import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: 'SUB_ADMIN' })
  role: string; // SUPER_ADMIN, SUB_ADMIN, EDITOR, MODERATOR

  @Prop({ default: 'ACTIVE' })
  status: string; // ACTIVE, INACTIVE

  @Prop({ type: [String], default: [] })
  permissions: string[]; // e.g. ['courts', 'judgments', 'articles', 'contacts', etc.]

  @Prop()
  lastLogin: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
