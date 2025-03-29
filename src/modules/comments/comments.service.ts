import { CommentsRepository } from './comment.repository';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    return this.commentsRepository.create(userId, createCommentDto);
  }
}
