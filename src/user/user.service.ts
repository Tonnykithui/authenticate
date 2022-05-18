import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
/* import { UpdateUserDto } from './dto/update-user.dto'; */
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userModel.findOne({
      Email: createUserDto.Email,
    });

    if (userExists != null) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Record already exists',
        },
        HttpStatus.CONFLICT,
      );
    }
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    const userExists = await this.userModel.findById({ _id: id });
    if (userExists == null) {
      throw new NotFoundException();
    }
    return userExists;
  }

  async loginUser(email: string, password: string) {
    const userExists = await this.userModel.findOne({ Email: email });
    console.log(userExists);
    if (userExists == null) {
      throw new NotFoundException();
    }

    const passwordIsCorrect = await bcrypt.compare(
      password,
      userExists.Password,
    );

    if (passwordIsCorrect) {
      const jwtToken = this.jwtService.sign(email);

      return {
        token: jwtToken,
      };
    }
    return 'Provide correct login credentials';
  }
}

/* update(id: number, updateUserDto: UpdateUserDto) {
  return `This action updates a #${id} user`;
}

remove(id: number) {
  return `This action removes a #${id} user`;
} */
