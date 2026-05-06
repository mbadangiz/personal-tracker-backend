import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll() {
    const data = await this.userRepo.find();
    const count = await this.userRepo.count();

    return { data, count };
  }

  async createUser(): Promise<User> {
    return await this.userRepo.save({
      email: "casa",
    });
  }
}
