import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from '@metools/tcheck';

import { InvalidInputError } from '../utils/errors';

export interface RewardJSON {
  id: string;
  vbUserId: string;
  name: string;
  price: number;
}

const isRewardJSONCommon = {
  id: isString,
  vbUserId: isString,
  name: isString,
  price: isNumber,
};

const isRewardJSON = typeGuardGenerator<RewardJSON>(isRewardJSONCommon);
const isRewardJSONTest = typeGuardTestGenerator(isRewardJSONCommon);

export class Reward {
  protected _id: string;
  protected _vbUserId: string;
  protected _name: string;
  protected _price: number;

  constructor(input: RewardJSON) {
    this._id = input.id;
    this._vbUserId = input.vbUserId;
    this._name = input.name;
    this._price = input.price;
  }

  get id(): string {
    return this._id;
  }
  get vbUserId(): string {
    return this._vbUserId;
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
      vbUserId: this.vbUserId,
      name: this.name,
      price: this.price,
    };
  }

  static fromJSON(input: unknown): Reward {
    if (!Reward.isRewardJSON(input)) {
      const errors = Reward.rewardJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    return new Reward(input);
  }

  static isRewardJSON = isRewardJSON;
  static rewardJSONTest = isRewardJSONTest;

  static fromNewReward(id: string, reward: Reward): Reward {
    return new Reward({
      ...reward.toJSON(),
      id,
    });
  }
}
