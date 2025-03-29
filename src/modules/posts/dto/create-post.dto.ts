import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostCategory } from 'src/common/enums/post-category.enum';

export class CreatePostDto {
  @ApiProperty({ description: 'หัวข้อของโพสต์' })
  @IsNotEmpty({ message: 'หัวข้อต้องไม่ว่างเปล่า' })
  @IsString({ message: 'หัวข้อต้องเป็นข้อความ' })
  topic: string;

  @ApiProperty({ description: 'เนื้อหาของโพสต์' })
  @IsNotEmpty({ message: 'เนื้อหาต้องไม่ว่างเปล่า' })
  @IsString({ message: 'เนื้อหาต้องเป็นข้อความ' })
  content: string;

  @ApiPropertyOptional({
    description: 'หมวดหมู่ของโพสต์',
    enum: PostCategory,
  })
  @IsOptional()
  @IsString({ message: 'หมวดหมู่ต้องเป็นข้อความ' })
  @IsEnum(PostCategory, { message: 'หมวดหมู่ไม่ถูกต้อง' })
  category?: string;
}
