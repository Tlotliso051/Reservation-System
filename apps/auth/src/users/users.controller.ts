import { Body, Controller } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  async creatUser(@Body() createUserDto: CreateUserDto): Promise<void> {}
}
