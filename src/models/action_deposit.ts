import { DateTime } from 'luxon';
import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from '@metools/tcheck';
import { v4 as uuidv4 } from 'uuid';

import { InvalidInputError } from '../utils/errors';
import { isValidDateTimeString } from '../utils/type_guards';
import { Action, ActionJSON } from './action';

export interface ActionDepositJSON {
  id: string;
  vbUserId: string;
  date: string;
  depositQuantity: number;
  action: ActionJSON;
}

const isActionDepositJSONCommon = {
  id: isString,
  vbUserId: isString,
  date: isValidDateTimeString,
  depositQuantity: isNumber,
  action: Action.isActionJSON,
};

const isActionDepositJSON = typeGuardGenerator<ActionDepositJSON>(
  isActionDepositJSONCommon,
);
const isActionDepositJSONTest = typeGuardTestGenerator(
  isActionDepositJSONCommon,
);

export class ActionDeposit {
  protected _id: string;
  protected _vbUserId: string;
  protected _date: DateTime<true>;
  protected _depositQuantity: number;
  protected _action: Action;

  constructor(input: ActionDepositJSON) {
    const date = DateTime.fromISO(input.date);
    if (!date.isValid) {
      throw new InvalidInputError('Invalid date');
    }
    this._date = date;
    this._id = input.id;
    this._vbUserId = input.vbUserId;
    this._depositQuantity = input.depositQuantity;
    this._action = new Action(input.action);
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
  get depositQuantity(): number {
    return this._depositQuantity;
  }
  get action(): Action {
    return this._action;
  }

  get tokensEarned(): number {
    const maxDeposit = this.action.maxDeposit ?? Infinity;

    const quant =
      maxDeposit < this._depositQuantity ? maxDeposit : this._depositQuantity;

    return quant * this._action.conversionRate;
  }

  toJSON(): ActionDepositJSON {
    return {
      id: this.id,
      vbUserId: this.vbUserId,
      date: this.date.toISO(),
      depositQuantity: this.depositQuantity,
      action: this.action.toJSON(),
    };
  }

  copyWith(input: Record<string, unknown>): ActionDeposit {
    return ActionDeposit.fromJSON({
      ...this.toJSON(),
      ...input,
    });
  }

  static fromJSON(input: unknown): ActionDeposit {
    if (!ActionDeposit.isActionDepositJSON(input)) {
      const errors = ActionDeposit.actionDepositJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    const dateTime = DateTime.fromISO(input.date, { zone: 'America/Chicago' });
    if (!dateTime.isValid) {
      throw new InvalidInputError('Invalid date');
    }

    return new ActionDeposit(input);
  }

  static fromActionNewDeposit(id: string, input: ActionDeposit): ActionDeposit {
    return new ActionDeposit({
      ...input.toJSON(),
      id,
    });
  }

  static fromAction(
    action: Action,
    depositQuantity: number,
    options?: { date?: DateTime<true> },
  ): ActionDeposit {
    const date = options?.date ?? DateTime.now();
    return new ActionDeposit({
      id: uuidv4(),
      vbUserId: action.vbUserId,
      date: date.toISO(),
      depositQuantity,
      action: action.toJSON(),
    });
  }

  static isActionDepositJSON = isActionDepositJSON;
  static actionDepositJSONTest = isActionDepositJSONTest;
}
