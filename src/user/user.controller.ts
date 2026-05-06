import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return this.userService.findAll();
  }

  @Get("create")
  async createUser() {
    return this.userService.createUser();
  }
}
