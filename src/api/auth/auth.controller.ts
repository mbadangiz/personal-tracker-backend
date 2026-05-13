import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateNewUserDto } from "src/application/dto/createNewUser.dto";
import { LoginDto } from "src/application/dto/login.dto";
import { JwtAuthGuard } from "src/guards/jwtAuthGuard.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("create-new-user")
  async createNewUser(@Body() body: CreateNewUserDto) {
    return await this.authService.createNewUser(body);
  }

  @Post("login")
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post("oo")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async loo(@Req() req) {
    console.log(req);
    return {
      user: req.user,
      headers: req.headers,
      method: req.method,
      url: req.url,
    };
  }
}
