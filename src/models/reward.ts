import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from 'tcheck';

import { InvalidInputError } from '../utils/errors';

export interface RewardJSON {
  id: string;
  userId: string;
  name: string;
  price: number;
}

const isRewardJSONCommon = {
  id: isString,
  userId: isString,
  name: isString,
  price: isNumber,
};

const isRewardJSON = typeGuardGenerator<RewardJSON>(isRewardJSONCommon);
const isRewardJSONTest = typeGuardTestGenerator(isRewardJSONCommon);

export class Reward {
  protected _id: string;
  protected _userId: string;
  protected _name: string;
  protected _price: number;

  constructor(input: RewardJSON) {
    this._id = input.id;
    this._userId = input.userId;
    this._name = input.name;
    this._price = input.price;
  }

  get id(): string {
    return this._id;
  }
  get userId(): string {
    return this._userId;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }

  toJSON(): RewardJSON {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      price: this.price,
    };
  }

  static fromJSON(input: unknown): Reward {
    if (!Reward.isRewardJSON(input)) {
      const errors = Reward.isRewardJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    return new Reward(input);
  }

  static isRewardJSON = isRewardJSON;
  static isRewardJSONTest = isRewardJSONTest;

  static fromNewReward(id: string, reward: Reward): Reward {
    return new Reward({
      ...reward.toJSON(),
      id,
    });
  }
}
