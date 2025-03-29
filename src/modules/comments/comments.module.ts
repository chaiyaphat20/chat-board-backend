import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentsRepository } from './comment.repository';

@Module({
  imports: [PrismaModule],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
