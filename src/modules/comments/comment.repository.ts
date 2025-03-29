import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    // check status post ว่ายังใช้ได้อยู่ไหม
    const post = await this.prisma.post.findFirst({
      where: {
        id: createCommentDto.post_id,
        is_active: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${createCommentDto.post_id} not found or inactive`);
    }
    // Create Comment
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        user_id: userId,
        post_id: createCommentDto.post_id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
    });
  }

  async findAllByPostId(postId: number) {
    return this.prisma.comment.findMany({
      where: {
        post_id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        post: {
          select: {
            id: true,
            topic: true,
            is_active: true,
          },
        },
      },
    });
  }

  async checkPostExists(postId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId,
        is_active: true,
      },
    });

    return !!post; // แปลงเป็น boolean
  }
}
