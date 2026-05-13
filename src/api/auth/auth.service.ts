import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { reportUnhandledError } from "rxjs/internal/util/reportUnhandledError";
import {
  CreateNewUserDto,
  CreateNewUserResponse,
} from "src/application/dto/createNewUser.dto";
import { LoginDto } from "src/application/dto/login.dto";
import { generalResponse } from "src/domain/abstracts/interfaces";
import { Profile } from "src/domain/entities/profile.entity";
import { Users } from "src/domain/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async findByKey<K extends keyof Users>(
    key: K,
    value: Users[K],
  ): Promise<Users | null> {
    const user = await this.userRepo.findOne({
      where: { [key]: value } as any,
    });

    return user;
  }

  async createNewUser(
    body: CreateNewUserDto,
  ): Promise<generalResponse<CreateNewUserResponse>> {
    try {
      const [emailUser, usernameUser, phoneUser] = await Promise.all([
        this.findByKey("email", body.email),
        this.findByKey("username", body.username),
        this.findByKey("phoneNumber", body.phoneNumber),
      ]);

      const errors: string[] = [];

      if (emailUser) errors.push("ایمیل قبلا ثبت شده");
      if (usernameUser) errors.push("نام کاربری قبلا ثبت شده");
      if (phoneUser) errors.push("شماره همراه قبلا ثبت شده");

      if (emailUser || usernameUser || phoneUser) {
        throw new ConflictException({
          success: false,
          message: "داده های تکراری.",
          statusCode: 409,
          data: errors,
        } as generalResponse<string[]>);
      }

      const hashPass = await this.hashPassword(body.password);

      const user = await this.userRepo.save({
        hashedPassword: hashPass,
        username: body.username,
        email: body.email,
        phoneNumber: body.phoneNumber,
        profile: {},
      });

      return {
        data: { id: user.id, username: user.username },
        message: "کاربر با موفقیت ایجاد شده است.",
        statusCode: 201,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(body: LoginDto) {
    try {
      const user = await this.findByKey(
        body.usernameOrEmailOrPhone.includes("@")
          ? "email"
          : body.usernameOrEmailOrPhone.startsWith("09") ||
              body.usernameOrEmailOrPhone.startsWith("+98")
            ? "phoneNumber"
            : "username",
        body.usernameOrEmailOrPhone,
      );

      if (!user) {
        throw new UnauthorizedException({
          success: false,
          message: "نام کاربری یا رمز عبور اشتباه است.",
          statusCode: 401,
          data: null,
        } as generalResponse<null>);
      }

      const isPassCorrect = await this.comparePassword(
        body.password,
        user.hashedPassword,
      );

      if (!isPassCorrect) {
        throw new UnauthorizedException({
          success: false,
          message: "نام کاربری یا رمز عبور اشتباه است.",
          statusCode: 401,
          data: null,
        } as generalResponse<null>);
      }

      return {
        token: await this.jwtService.signAsync({ sub: user.id }),
      };
    } catch (error) {
      throw error;
    }
  }
}
