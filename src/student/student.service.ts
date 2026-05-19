import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Student,
  StudentDocument,
} from './student.schema';

@Injectable()
export class StudentService {

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async create(student: any) {
    const newStudent =
      new this.studentModel(student);

    return newStudent.save();
  }

  async findAll() {
    return this.studentModel.find();
  }

  async update(id: string, student: any) {
    return this.studentModel.findByIdAndUpdate(
      id,
      student,
      { new: true },
    );
  }

  async delete(id: string) {
    return this.studentModel.findByIdAndDelete(id);
  }
}