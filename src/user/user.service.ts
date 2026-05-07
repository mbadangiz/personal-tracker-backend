import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../domain/entities/users.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly usersRepo: Repository<Users>,
  ) {}
}
