import { IsString } from "class-validator";

export class LoginDto {
  @IsString()
  usernameOrEmailOrPhone: string;

  @IsString()
  password: string;
}
