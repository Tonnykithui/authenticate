import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
/* import { UpdateUserDto } from './dto/update-user.dto'; */

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(
    @Body('Name') Name: string,
    @Body('Email') Email: string,
    @Body('Password') Password: string,
    @Body('DoB') DoB: Date,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltOrRounds);

    return this.userService.create({
      Name,
      Email,
      Password: hashedPassword,
      DoB,
    });
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('login')
  async login(
    @Body('Email') Email: string,
    @Body('Password') Password: string,
    @Res() res: Response,
  ) {
    return this.userService.loginUser(Email, Password);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  } */
}
function saltOrRounds(Password: string, saltOrRounds: any, arg2: number) {
  throw new Error('Function not implemented.');
}
