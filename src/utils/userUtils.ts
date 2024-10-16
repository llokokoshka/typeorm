import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import { generatePassword } from "./authUtils";

const userRepository = AppDataSource.getRepository(User);

export async function findUser(id:number) {
  console.log(id);
  return await userRepository.findOneBy({ id: id });
}

export function addUserInDb(userFromDb:User, newUserInfo:User){

  const { fullName, email, password, Dob } = newUserInfo;
  const hashPass = generatePassword(password);

  userFromDb.fullName = fullName;
  userFromDb.email = email;
  userFromDb.Dob = Dob;
  userFromDb.password = hashPass.salt + '//' + hashPass.hash;

  return userFromDb;
}