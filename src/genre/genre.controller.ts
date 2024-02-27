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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({
    summary: 'create genre',
    description: 'to create genre',
  })
  @Post()
  async createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreService.create(createGenreDto);
  }

  @ApiOperation({
    summary: 'create genre',
    description: 'to get by parameterised genre',
  })
  @Get()
  async getAllGenre(@Query('title') title: string): Promise<Genre[]> {
    return await this.genreService.findAll({ title });
  }

  @ApiOperation({
    summary: 'get uniquie genre',
    description: 'to get unique genre',
  })
  @Get(':id')
  async getOneGenre(@Param('id') id: string): Promise<Genre> {
    return await this.genreService.findOne({ id: +id });
  }

  @ApiOperation({
    summary: 'update genre',
    description: 'to update genre',
  })
  @Patch(':id')
  async updateGenre(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    return await this.genreService.update({ id: +id }, updateGenreDto);
  }

  @ApiOperation({
    summary: 'delete genre',
    description: 'to delete genre',
  })
  @Delete(':id')
  async removeGenre(@Param('id') id: string): Promise<Genre> {
    return await this.genreService.remove({ id: +id });
  }
}
