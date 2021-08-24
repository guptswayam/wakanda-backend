import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers()
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() user: CreateUserDTO) {
    console.log(user)
    return this.userService.createUser(user)
  }

}