import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, PaginateModel } from 'mongoose';
import { userRole } from './roles.enum';
import { AddRoleDto } from './dto/add-role-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: PaginateModel<User>,
  ) {}


  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(query): Promise<User[]> {
    const users = await this.userModel.paginate({}, {
      page: query.page,
      limit: query.limit
    }).then((result) => {
      return result.docs;
    });
    return users;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne
    ({ username: username }).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async addRole(addRoleDto: AddRoleDto): Promise<User>{
    const user = await this.userModel.findById(addRoleDto.id);
    //avoid duplicate roles
    const roles = new Set(user.roles);
    for (let role of addRoleDto.roles) {
      roles.add(role);
    }
    user.roles = [...roles];
    console.log(user);
    const updatedUser = await this.userModel.findByIdAndUpdate({ _id: addRoleDto.id }, user).exec();
    return updatedUser;
  }
}

