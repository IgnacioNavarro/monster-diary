import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Put, UseGuards, ConflictException, NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/add-role-dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { userRole } from './roles.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto).catch((error) => {
      throw new ConflictException(error.message);
    });
  }

  @Get()
  @ApiOkResponse()
  async findAll(@Query() query: {page: number, limit: number}) {
    return await this.usersService.findAll(query).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException( `User with id ${id} not found`);
    }
    return user;
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    if (!user) {
      throw new NotFoundException( `User with id ${id} not found`);
    }
    return "User deleted successfully";
  }

  @Get(':username')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN, userRole.CEO, userRole.EMPLOYEE)
  async findOneByUsername(@Param('username') username: string) {
    const user = this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException( `User with username ${username} not found`);
    }
    return user;
  }

  @Post('/addrole')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRole.ADMIN)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async addRole(@Body() addRoleDto: AddRoleDto) {
    const user = await this.usersService.addRole(addRoleDto);
    if (!user) {
      throw new NotFoundException( `User with id ${addRoleDto.id} not found`);
    }
    return user;
  }
}
