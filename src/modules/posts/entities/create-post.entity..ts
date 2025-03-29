import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { UserEntity } from '../../users/entities/user.entity';

export class PostEntity {
  id: number;
  user_id: string;
  topic: string;
  content: string;
  category?: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  user?: UserEntity;
  comments?: CommentEntity[];
}
