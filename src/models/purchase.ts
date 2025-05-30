import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from 'tcheck';

import { InvalidInputError } from '../utils/errors';
import { isValidDateTimeString } from '../utils/type_guards';
import { Reward, RewardJSON } from './reward';

export interface PurchaseJSON {
  id: string;
  vbUserId: string;
  date: string;
  purchasedQuantity: number;
  reward: RewardJSON;
}

const isPurchaseJSONCommon = {
  id: isString,
  vbUserId: isString,
  date: isValidDateTimeString,
  purchasedQuantity: isNumber,
  reward: Reward.isRewardJSON,
};

const isPurchaseJSON = typeGuardGenerator<PurchaseJSON>(isPurchaseJSONCommon);
const isPurchaseJSONTest = typeGuardTestGenerator(isPurchaseJSONCommon);

export class Purchase {
  protected _id: string;
  protected _vbUserId: string;
  protected _date: DateTime<true>;
  protected _purchasedQuantity: number;
  protected _reward: Reward;

  constructor(input: PurchaseJSON) {
    const date = DateTime.fromISO(input.date);
    if (!date.isValid) {
      throw new InvalidInputError('Invalid date');
    }
    this._date = date;
    this._id = input.id;
    this._vbUserId = input.vbUserId;
    this._purchasedQuantity = input.purchasedQuantity;
    this._reward = new Reward(input.reward);
  }

  get id(): string {
    return this._id;
  }
  get vbUserId(): string {
    return this._vbUserId;
  }
  get date(): DateTime<true> {
    return this._date;
  }
  get purchasedQuantity(): number {
    return this._purchasedQuantity;
  }
  get reward() {
    return this._reward;
  }

  get tokensSpent(): number {
    return this._reward.price * this._purchasedQuantity;
  }

  toJSON(): PurchaseJSON {
    return {
      id: this.id,
      vbUserId: this.vbUserId,
      date: this.date.toISO(),
      purchasedQuantity: this.purchasedQuantity,
      reward: this.reward.toJSON(),
    };
  }

  static fromJSON(input: unknown): Purchase {
    if (!Purchase.isPurchaseJSON(input)) {
      const errors = Purchase.purchaseJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    return new Purchase(input);
  }

  static fromNewPurchase(id: string, purchase: Purchase): Purchase {
    return new Purchase({
      ...purchase.toJSON(),
      id,
    });
  }

  static fromReward(
    reward: Reward,
    purchasedQuantity: number,
    options?: { date: DateTime<true> },
  ): Purchase {
    const date = options?.date ?? DateTime.now();
    return new Purchase({
      id: uuidv4(),
      vbUserId: reward.vbUserId,
      date: date.toISO(),
      purchasedQuantity,
      reward: reward.toJSON(),
    });
  }

  static isPurchaseJSON = isPurchaseJSON;
  static purchaseJSONTest = isPurchaseJSONTest;
}
