import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';
import { FindPostsQueryDto } from './dto/find-post-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'สร้างโพสต์ใหม่' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'โพสต์ถูกสร้างเรียบร้อย' })
  create(@GetUser('id') userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'ดึงรายการโพสต์ทั้งหมด' })
  @ApiQuery({ name: 'category', required: false, description: 'กรองโพสต์ตามหมวดหมู่' })
  @ApiQuery({ name: 'limit', required: false, description: 'จำกัดจำนวนโพสต์ที่แสดง' })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'สำหรับการแบ่งหน้า',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'รายการโพสต์ทั้งหมด' })
  findAll(@Query() query: FindPostsQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id/with-comments')
  @ApiOperation({ summary: 'ดึงรายละเอียดโพสต์พร้อมความคิดเห็นทั้งหมด' })
  @ApiParam({ name: 'id', description: 'ID ของโพสต์' })
  @ApiResponse({ status: HttpStatus.OK, description: 'รายละเอียดโพสต์พร้อมความคิดเห็น' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'ไม่พบโพสต์' })
  findOneWithComments(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOneWithComments(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, user.id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user) {
    return this.postsService.remove(id, user.id);
  }
}
