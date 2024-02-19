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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return await this.authorService.create({
      ...createAuthorDto,
      birthday: new Date(createAuthorDto.birthday),
    });
  }

  @Get()
  async getAllAuthor(
    @Query('first_name') first_name?: string,
    @Query('last_name') last_name?: string,
    @Query('birthday') birthday?: string,
  ): Promise<Author[]> {
    return await this.authorService.findAll({
      first_name,
      last_name,
      birthday,
    });
  }

  @Get(':id')
  async getOneAuthor(@Param('id') id: string): Promise<Author> {
    return await this.authorService.findOne({ id: +id });
  }

  @Patch(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<Author> {
    return await this.authorService.remove({ id: +id });
  }
}
