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
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreService.create(createGenreDto);
  }

  @Get()
  async getAllGenre(@Query('title') title: string): Promise<Genre[]> {
    return await this.genreService.findAll({ title });
  }

  @Get(':id')
  async getOneGenre(@Param('id') id: string): Promise<Genre> {
    return await this.genreService.findOne({ id: +id });
  }

  @Patch(':id')
  async updateGenre(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return await this.genreService.update({ id: +id }, updateGenreDto);
  }

  @Delete(':id')
  async removeGenre(@Param('id') id: string): Promise<Genre> {
    return await this.genreService.remove({ id: +id });
  }
}
