import { injectable } from "inversify";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { UserBet } from "../entity/UserBet";
import { UserDTO } from "../model/userDto";

export interface IUserService {
  updateUser(userDto: UserDTO): Promise<User>;
  getUser(userId: string): Promise<User | undefined>;
  getBets(betUid: number): Promise<UserBet[] | undefined>;
}

@injectable()
export class UserService implements IUserService {
  private _userRepository = getRepository(User);
  private _userBetRepository = getRepository(UserBet);

  async getUser(userId: string): Promise<User | undefined> {
    return await this._userRepository.findOne({ uid: userId });
  }

  updateUser(userDto: UserDTO): Promise<User> {
    throw new Error("not implemented");
  }

  async getBets(betUid: number): Promise<UserBet[] | undefined> {
    return await this._userBetRepository.find({ betUid: betUid });
  }
}
