import { hash } from "bcrypt";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class UserService {
  public users = userModel;

  public async createUser(userData: User): Promise<any> {

    const findUser = await this.users.findOne({ email: userData.email });
    if(findUser) return {error:"user already exists"};

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

}

export default UserService;
