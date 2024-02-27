import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: 'create book',
    description: 'to create book',
  })
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create({
      genre: { connect: { id: createBookDto.genre_id } },
      author: { connect: { id: createBookDto.author_id } },
      title: createBookDto.title,
      date: new Date(createBookDto.date),
    });
  }

  @ApiOperation({
    summary: 'get all book',
    description: 'to get all book by parameters',
  })
  @Get()
  async getAllBooks(
    @Query('title') title?: string,
    @Query('author_id') author?: number,
    @Query('genre_id') genre?: number,
  ): Promise<Book[]> {
    const author_id = author ? +author : undefined;
    const genre_id = genre ? +genre : undefined;

    return await this.bookService.findAll({
      title,
      author_id,
      genre_id,
    });
  }

  @ApiOperation({
    summary: 'get unique book',
    description: 'to get unique book',
  })
  @Get(':id')
  async getOneBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findOne({ id: +id });
  }

  @ApiOperation({
    summary: 'update book',
    description: 'update book',
  })
  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.bookService.update({ id: +id }, updateBookDto);
  }

  @ApiOperation({
    summary: 'delete book',
    description: 'to delete book',
  })
  @Delete(':id')
  async removeBook(@Param('id') id: string): Promise<Book> {
    return await this.bookService.remove({ id: +id });
  }
}
