import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { HashService } from 'src/user/utils/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DatabaseService,
    private readonly hashService: HashService,
  ) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    try {
      const alreadyExists = await this.db.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (alreadyExists) {
        throw new ConflictException('This email is already registered');
      }
      const hashedPassword = await this.hashService.hash(
        createUserDto.password,
      );
      const user = await this.db.user.create({
        data: { ...createUserDto, password: hashedPassword },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, authProvider, authProviderId, ...userData } = user;
      return userData;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // Re-throw the conflict exception
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const users = await this.db.user.findMany();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      photoUrl: user.photoUrl,
      gender: user.gender,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
