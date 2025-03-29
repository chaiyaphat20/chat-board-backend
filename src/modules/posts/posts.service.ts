import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './posts.repository';
import { FindPostsQueryDto } from './dto/find-post-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    return this.postsRepository.create(userId, createPostDto);
  }

  async findAll(query: FindPostsQueryDto) {
    return this.postsRepository.findAll(query.category, query.limit, query.offset);
  }
  async findOneWithComments(id: number) {
    const post = await this.postsRepository.findOneWithComments(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found or inactive`);
    }
    return post;
  }

  async update(id: number, userId: string, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found or inactive`);
    }

    if (post.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to update this post');
    }

    return this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number, userId: string) {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found or inactive`);
    }

    if (post.user_id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this post');
    }

    return this.postsRepository.remove(id);
  }
}
