import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { StudentService } from './student.service';

@Controller('students')
export class StudentController {

  constructor(
    private readonly studentService: StudentService,
  ) {}

  @Post()
  create(@Body() body) {
    return this.studentService.create(body);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @Put(':id')
update(
  @Param('id') id: string,
  @Body() body,
) {
  return this.studentService.update(id, body);
}

@Delete(':id')
delete(@Param('id') id: string) {
  return this.studentService.delete(id);
}
}