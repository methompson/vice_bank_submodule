import { DateTime } from 'luxon';
import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from 'tcheck';

import { InvalidInputError } from '../utils/errors';
import { isValidDateTimeString } from '../utils/type_guards';
import { PurchasePrice, PurchasePriceJSON } from './purchase_price';

export interface PurchaseJSON {
  id: string;
  userId: string;
  date: string;
  purchasedQuantity: number;
  purchasePrice: PurchasePriceJSON;
}

const isPurchaseJSONCommon = {
  id: isString,
  userId: isString,
  date: isValidDateTimeString,
  purchasedQuantity: isNumber,
  purchasePrice: PurchasePrice.isPurchasePriceJSON,
};

const isPurchaseJSON = typeGuardGenerator<PurchaseJSON>(isPurchaseJSONCommon);
const isPurchaseJSONTest = typeGuardTestGenerator(isPurchaseJSONCommon);

export class Purchase {
  protected _id: string;
  protected _userId: string;
  protected _date: DateTime<true>;
  protected _purchasedQuantity: number;
  protected _purchasePrice: PurchasePrice;

  constructor(input: PurchaseJSON) {
    const date = DateTime.fromISO(input.date);
    if (!date.isValid) {
      throw new InvalidInputError('Invalid date');
    }
    this._date = date;
    this._id = input.id;
    this._userId = input.userId;
    this._purchasedQuantity = input.purchasedQuantity;
    this._purchasePrice = new PurchasePrice(input.purchasePrice);
  }

  get id(): string {
    return this._id;
  }
  get userId(): string {
    return this._userId;
  }
  get date(): DateTime<true> {
    return this._date;
  }
  get purchasedQuantity(): number {
    return this._purchasedQuantity;
  }
  get purchasePrice() {
    return this._purchasePrice;
  }

  toJSON(): PurchaseJSON {
    return {
      id: this.id,
      userId: this.userId,
      date: this.date.toISO(),
      purchasedQuantity: this.purchasedQuantity,
      purchasePrice: this.purchasePrice.toJSON(),
    };
  }

  static fromJSON(input: unknown): Purchase {
    if (!Purchase.isPurchaseJSON(input)) {
      const errors = Purchase.PurchaseJSONTest(input);
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

  static isPurchaseJSON = isPurchaseJSON;
  static PurchaseJSONTest = isPurchaseJSONTest;
}
