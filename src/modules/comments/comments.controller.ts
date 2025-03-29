import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'สร้างความคิดเห็นใหม่ในโพสต์' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'ความคิดเห็นถูกสร้างเรียบร้อย' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบโพสต์ที่ระบุ' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'ไม่ได้รับอนุญาต' })
  create(@GetUser('id') userId: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(userId, createCommentDto);
  }

  // @Get('post/:postId')
  // @ApiOperation({ summary: 'ดึงรายการความคิดเห็นทั้งหมดของโพสต์' })
  // @ApiParam({ name: 'postId', description: 'ID ของโพสต์' })
  // @ApiResponse({ status: HttpStatus.OK, description: 'รายการความคิดเห็นทั้งหมดของโพสต์' })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบโพสต์ที่ระบุ' })
  // findAllByPostId(@Param('postId', ParseIntPipe) postId: number) {
  //   return this.commentsService.findAllByPostId(postId);
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'ดึงรายละเอียดความคิดเห็นตาม ID' })
  // @ApiParam({ name: 'id', description: 'ID ของความคิดเห็น' })
  // @ApiResponse({ status: HttpStatus.OK, description: 'รายละเอียดความคิดเห็น' })
  // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบความคิดเห็น' })
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.commentsService.findOne(id);
  // }
}
