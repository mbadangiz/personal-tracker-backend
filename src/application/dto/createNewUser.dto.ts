import { IsEmail, IsString, Length, Matches } from "class-validator";

export class CreateNewUserDto {
  @IsString({
    message: "نام کاربری باید یک رشته باشد",
  })
  @Length(3, 30, {
    message: "نام کاربری باید بین ۳ تا ۳۰ کاراکتر باشد",
  })
  username: string;

  @IsEmail(
    {},
    {
      message: "ایمیل وارد شده معتبر نیست",
    },
  )
  email: string;

  @IsString({
    message: "رمز عبور باید یک رشته باشد",
  })
  @Length(6, 50, {
    message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
  })
  password: string;

  @Matches(/^(\+98|0)?9\d{9}$/, {
    message: "شماره موبایل معتبر نیست",
  })
  phoneNumber: string;
}

export interface CreateNewUserResponse {
  id: number;
  username: string;
}
