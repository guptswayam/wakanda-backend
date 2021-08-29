import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Repository, getConnection, EntityManager } from "typeorm";
import { CreateUserDTO } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  // entityManager: EntityManager;

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
    // this.entityManager = getConnection().manager
  }

  getUsers() {
    return this.userRepo.find({relations: ["superhero", "agent"]})
    // return this.entityManager.query("select * from users where username=$1", ["swayam"]);
  }

  async createUser(data: CreateUserDTO) {

    const user = new User()
    user.id = data.id;
    user.password = data.password;
    user.email = data.email;
    user.superhero = data.superhero
    user.agent = data.agent

    await this.userRepo.save(user)

    return user

  }

  async duplicateUserCheck(id: string) {
    const user = await this.userRepo.findOne({id})
    if(user)
      throw new BadRequestException("Id already exists")
  }

  async findUserOrThrowError(params: any) {
    const user = await this.userRepo.findOne(params, {relations: ["superhero", "agent"]})
    if(!user)
      throw new BadRequestException("Invalid Id!")
    return user
  }

}