import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseFilters, ForbiddenException, NotFoundException, ConflictException, UseGuards, Query } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../exception-filters/http-exception.filter';
import { userRole } from '../users/roles.enum';
import { Roles } from '../users/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../users/roles.guard';


@ApiTags('monsters')
@Controller('monsters')
@UseFilters(new GlobalExceptionFilter())
export class MonstersController {
  constructor(private readonly monstersService: MonstersService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  async create(@Body() createMonsterDto: CreateMonsterDto) {
    return this.monstersService.create(createMonsterDto).catch((error) => {
      throw new ConflictException(error.message);
    }
    );
  }

  @Get()
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async findAll(@Query() query: {page: number, limit: number}) {
    return this.monstersService.findAll(query).catch((error) => {
      throw new ForbiddenException(error.message);
    });
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string) {
    const monster = await this.monstersService.findOne(id);
    if (!monster) {
      throw new NotFoundException( `Monster with id ${id} not found`);
    }
    return monster;
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateMonsterDto: UpdateMonsterDto) {
    const monster = await this.monstersService.update(id, updateMonsterDto);
    if (!monster) {
      throw new NotFoundException( `Monster with id ${id} not found`);
    }
    return monster;
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id') id: string) {
    const monster = await this.monstersService.remove(id);
    if (!monster) {
      throw new NotFoundException( `Monster with id ${id} not found`);
    }
    return "Monster deleted successfully";
  }
}
