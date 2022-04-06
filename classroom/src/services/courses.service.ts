import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  slug?: string;
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async listAllCourses() {
    return await this.prisma.course.findMany();
  }

  async getCourseById(couseId: string) {
    return await this.prisma.course.findUnique({
      where: {
        id: couseId,
      },
    });
  }

  async getCourseBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course already exists!');
    }

    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
