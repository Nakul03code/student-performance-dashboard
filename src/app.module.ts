import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentModule } from './student/student.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/studentdb',
    ),
    StudentModule,
  ],
})
export class AppModule {}