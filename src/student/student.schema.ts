import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {

  @Prop()
  name: string;

  @Prop()
  subject: string;

  @Prop()
  marks: number;
}

export const StudentSchema =
  SchemaFactory.createForClass(Student);