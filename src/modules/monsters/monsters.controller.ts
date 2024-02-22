import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseFilters, ForbiddenException, NotFoundException, ConflictException, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, ApiParam } from '@nestjs/swagger';
import { GlobalExceptionFilter } from '../exception-filters/http-exception.filter';
import { userRole } from '../users/roles.enum';
import { Roles } from '../users/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../users/roles.guard';
import { isInt } from 'class-validator';
import { MonstersVoteService } from './monsters-vote.service';
import { voteMonsterDto } from './dto/vote-monster.dto';

@ApiTags('monsters')
@Controller('monsters')
@UseFilters(new GlobalExceptionFilter())
export class MonstersController {
  constructor(private readonly monstersService: MonstersService, 
    readonly monstersVoteService: MonstersVoteService) {}

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
  @ApiParam({name: 'page', required: true, type: Number})
  @ApiParam({name: 'limit', required: true, type: Number})
  async findAll(@Query() query: {page: number, limit: number}) {
    return this.monstersService.findAll(query).catch((error) => {
      throw new ForbiddenException(error.message);
    });
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiParam({name: 'id', required: true, type: String})
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
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiParam({name: 'id', required: true, type: String})
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
  @ApiParam({name: 'id', required: true, type: String})
  async remove(@Param('id') id: string) {
    const monster = await this.monstersService.remove(id);
    if (!monster) {
      throw new NotFoundException( `Monster with id ${id} not found`);
    }
    return "Monster deleted successfully";
  }


  @Post(':id/addgold')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.CEO)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiParam({name: 'id', required: true, type: String})
  async addGold(@Param('id') id: string, @Body() updateGoldDto) {
    if(updateGoldDto.amount < 0 || !isInt(updateGoldDto.amount) ){
      throw new BadRequestException("Amount must be a positive number with no decimal places.");
    }
    const monster = await this.monstersService.addGold(id, updateGoldDto);
    if (!monster) {
      throw new NotFoundException( `Monster with id ${id} not found`);
    }
    return monster;
  }

  @Post(':id/removegold')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.CEO, userRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiParam({name: 'id', required: true, type: String})
  async removeGold(@Param('id') id: string, @Body() updateGoldDto) {
    if(updateGoldDto.amount < 0 || !isInt(updateGoldDto.amount) ){
      throw new BadRequestException("Amount must be a positive number with no decimal places.");
    }
    const monster = await this.monstersService.removeGold(id, updateGoldDto);
    if (!monster) {
      throw new NotFoundException( `Monster with id ${id} not found`);
    }
    return monster;
  }

  @Post(':id/vote')
  @UseGuards(AuthGuard)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiParam({name: 'id', required: true, type: String})
  async vote(@Param('id') id: string, @Body() voteMonsterDto: voteMonsterDto) {
    const monster = await this.monstersVoteService.voteForMonster(id, voteMonsterDto.username);
    return monster;
  }

  @Post(':id/clearvotes')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.CEO)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiParam({name: 'id', required: true, type: String})
  async clearVotes(@Param('id') id: string) {
    const monster = await this.monstersVoteService.clearVotes(id);
    return monster;
  }


}
