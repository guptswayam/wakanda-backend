import { Body, Controller, Get, Post, Req, UsePipes } from "@nestjs/common";
import { Request } from "express";
import { Superhero } from "src/entities/superhero.entity";
import { ValidationPipe } from "src/shared/pipes/validation.pipe";
import { CreateSuperheroDTO } from "./dto/createSuperhero.dto";
import { SuperheroLoginDTO } from "./dto/superheroLogin.dto";
import { SuperheroService } from "./superhero.service";


function MyMiddleware(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
  const func = descriptor.value
  descriptor.value = function(...args: any[]) {
    // bind returns the function with preset arguments while apply calls the function with arguments list
    // The call() method takes arguments separately.
    // The apply() method takes arguments as an array.
    console.log("XXXXXXXXXXYYYYYYY")
    return func.apply(this, args)
  }
}


@Controller("superheroes")
export class SuperheroController {

  constructor(private readonly superheroService: SuperheroService) {}

  @Get()
  @MyMiddleware
  getSuperheroes(@Req() req: Request) {
    console.log(req.query)
    return this.superheroService.getSuperheroes()
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createSuperhero(@Body() superhero: CreateSuperheroDTO) {
    console.log(superhero)
    return this.superheroService.createSuperhero(superhero)
  }

  @UsePipes(new ValidationPipe())
  @Post("login")
  login(@Body() data: SuperheroLoginDTO) {
    return this.superheroService.login(data)
  }

  @Get("me")
  me(@Req() req: Request) {
    return req.user
  }

}