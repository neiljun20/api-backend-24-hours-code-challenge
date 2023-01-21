import { compare } from "bcrypt";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { DataStoredInToken, TokenData } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import SendgridService from "./sendgrid.service";

class AuthService {

  private sendgridService = new SendgridService();

  public users = userModel;

  public signUp = async (userData: User): Promise<any> => {

    const findUser = await this.users.findOne({ email: userData.email });
    if(findUser) throw new Error("user already exists");

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  };

  public login = async (userData:User): Promise<{ cookie: string; findUser: User }> => {
    if (!userData) throw new Error("userData is empty");

    const findUser = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new Error(`This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new Error("Password is not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  };

  public logout = async (userData: User): Promise<User> => {
    if (!userData) throw new Error("userData is empty");

    const findUser = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new Error(`This email ${userData.email} was not found`);

    return findUser;
  };

  public createToken = (user: User): TokenData => {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey = String(SECRET_KEY);
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  };

  public createCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  };

  public forgotPassword = async (userData:User): Promise<User> => {
    if (!userData) throw new Error("user is empty");

    const findUser = await this.users.findOne({ email: userData.email });

    if (!findUser) throw new Error("User doesn't exist");

    const passwordResetToken = await hash(String(Math.random()), 10);

    const updateUserById = await this.users.findByIdAndUpdate({_id:findUser._id}, {$set:{ passwordResetToken }}, {new:true});
    if (!updateUserById) throw new Error("User doesn't exist");

    await this.sendgridService.sendPasswordResetToken(findUser.email, findUser._id, passwordResetToken);

    return updateUserById;
  };
}

export default AuthService;
