import { Expose } from 'class-transformer';
import { PostEntity } from 'src/modules/posts/entities/create-post.entity.';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class CommentEntity {
  id: number;
  user_id: string;
  post_id: number;
  content: string;
  created_at: Date;
  user?: UserEntity;
  post?: PostEntity;
  @Expose()
  get formattedCreatedAt(): string {
    return this.created_at.toLocaleString();
  }
}
