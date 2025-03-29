import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'ID ของโพสต์ที่ต้องการแสดงความคิดเห็น',
    example: 1,
  })
  @IsNotEmpty({ message: 'post_id ต้องไม่ว่างเปล่า' })
  @IsNumber({}, { message: 'post_id ต้องเป็นตัวเลข' })
  post_id: number;

  @ApiProperty({
    description: 'เนื้อหาของความคิดเห็น',
    example: 'นี่เป็นความคิดเห็นของฉันเกี่ยวกับโพสต์นี้',
  })
  @IsNotEmpty({ message: 'content ต้องไม่ว่างเปล่า' })
  @IsString({ message: 'content ต้องเป็นข้อความ' })
  content: string;
}
