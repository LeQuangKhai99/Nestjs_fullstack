import { Factory } from "typeorm-factory";
import * as faker from "faker";
import * as bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { Role } from "src/roles/entities/role.entity";
 
const RoleFactory = new Factory(Role)
  .sequence("name", (i) => `role ${i}`)
const UserFactory = new Factory(User)
  .sequence("email", (i) => `${faker.internet.email()} ${i}`)
  .attr("username", faker.name.findName())
  .attr("password", bcrypt.hash("abc", 10))
  .attr("avatar", faker.image.imageUrl())
  .attr("active", true)
  .attr("token", 'faker.image.imageUrl')
  .assocOne("role", RoleFactory)

 
export const build = async () => {
  console.log(await UserFactory.buildList(1));
  
  console.log(await UserFactory.createList(1));
  
}