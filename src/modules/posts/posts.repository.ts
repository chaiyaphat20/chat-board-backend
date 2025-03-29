import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        user_id: userId,
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

  async findOneWithComments(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
        is_active: true,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        comments: {
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
            created_at: 'desc',
          },
        },
      },
    });
  }
  async findAll(category?: string, limit?: number, offset?: number) {
    const where = category ? { category, is_active: true } : { is_active: true };
    return this.prisma.post.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        comments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                fullName: true,
              },
            },
            content: true,
            created_at: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      skip: offset ? Number(offset) : undefined,
      take: limit ? Number(limit) : undefined,
    });
  }

  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id, is_active: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
        comments: {
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
        },
      },
    });
  }

  async getCategories() {
    return this.prisma.post.groupBy({
      by: ['category'],
      where: {
        is_active: true,
        category: {
          not: null,
        },
      },
      _count: {
        category: true,
      },
    });
  }

  async getUserPosts(userId: string) {
    return this.prisma.post.findMany({
      where: {
        user_id: userId,
        is_active: true,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
  async update(id: number, updatePostDto: UpdatePostDto) {
    const response = await this.prisma.post.update({
      where: { id },
      data: {
        ...(updatePostDto.topic !== undefined ? { topic: updatePostDto.topic } : {}),
        ...(updatePostDto.content !== undefined ? { content: updatePostDto.content } : {}),
        ...(updatePostDto.category !== undefined ? { category: updatePostDto.category } : {}),
        updated_at: new Date(),
      },
    });
    if (response.id) {
      return `Update Post id ${id} success`;
    }
  }

  async remove(id: number) {
    const response = await this.prisma.post.delete({
      where: { id },
    });
    if (response.id) {
      return `Delete Post id ${id} success`;
    }
  }
}
