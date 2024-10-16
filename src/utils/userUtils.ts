import { User } from "../db/entity/User";
import { AppDataSource } from "../db/dataSource";
import { generatePassword } from "./authUtils";

const userRepository = AppDataSource.getRepository(User);

export async function findUser(id: number) {
  console.log(id);
  return await userRepository.findOneBy({ id: id });
}

export function addUserInDb(userFromDb: User, newUserInfo: User) {

  for (let key in newUserInfo) {
    if (key === 'fullName') userFromDb.fullName = newUserInfo.fullName;
    if (key === 'email')  userFromDb.email = newUserInfo.email;;
    if (key === 'Dob') userFromDb.Dob = newUserInfo.Dob;
    if (key === 'password') {
       const hashPass = generatePassword(newUserInfo.password);
       userFromDb.password = hashPass.salt + '//' + hashPass.hash;};
  }  
  
  return userFromDb;
}