import { DateTime } from 'luxon';
import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from 'tcheck';

import { InvalidInputError } from '../utils/errors';
import { isValidDateTimeString } from '../utils/type_guards';
import { Action, ActionJSON } from './action';

export interface ActionDepositJSON {
  id: string;
  userId: string;
  date: string;
  depositQuantity: number;
  action: ActionJSON;
}

const isActionDepositJSONCommon = {
  id: isString,
  userId: isString,
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
  protected _userId: string;
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
    this._userId = input.userId;
    this._depositQuantity = input.depositQuantity;
    this._action = new Action(input.action);
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
  get depositQuantity(): number {
    return this._depositQuantity;
  }
  get action() {
    return this._action;
  }

  toJSON(): ActionDepositJSON {
    return {
      id: this.id,
      userId: this.userId,
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
    if (!ActionDeposit.isDepositJSON(input)) {
      const errors = ActionDeposit.DepositJSONTest(input);
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

  static isDepositJSON = isActionDepositJSON;

  static DepositJSONTest = isActionDepositJSONTest;
}
