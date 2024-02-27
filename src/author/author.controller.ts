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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({
    summary: 'create author',
    description: 'to create new author',
  })
  @Post()
  async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return await this.authorService.create({
      ...createAuthorDto,
      birthday: new Date(createAuthorDto.birthday),
    });
  }

  @ApiOperation({
    summary: 'get all users',
    description: 'to get all users by parameterised',
  })
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

  @ApiOperation({
    summary: 'get unique user',
    description: 'to get unique user',
  })
  @Get(':id')
  async getOneAuthor(@Param('id') id: string): Promise<Author> {
    return await this.authorService.findOne({ id: +id });
  }

  @ApiOperation({
    summary: 'update user',
    description: 'to update user',
  })
  @Patch(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @ApiOperation({
    summary: 'delete user',
    description: 'to delete user',
  })
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<Author> {
    return await this.authorService.remove({ id: +id });
  }
}
