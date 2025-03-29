import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PostCategory } from 'src/common/enums/post-category.enum';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(PostCategory)
  category?: PostCategory;
}
