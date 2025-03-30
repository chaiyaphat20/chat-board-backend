import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { PostCategory } from 'src/common/enums/post-category.enum';

export class FindPostsQueryDto {
  @IsOptional()
  @IsEnum(PostCategory, { message: 'หมวดหมู่ไม่ถูกต้อง' })
  category?: PostCategory;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsString()
  userId?: string;
}
