import { compare } from "bcrypt";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";

class AuthService {
  public users = userModel;

  public async signUp(userData: User): Promise<any> {

    const findUser = await this.users.findOne({ email: userData.email });
    if(findUser) throw new Error("user already exists");

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData:User): Promise<{ cookie: string; findUser: User }> {
    if (!userData) throw new Error("userData is empty");

    const findUser = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new Error(`This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new Error("Password is not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (!userData) throw new Error("userData is empty");

    const findUser = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new Error(`This email ${userData.email} was not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey = String(SECRET_KEY);
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
