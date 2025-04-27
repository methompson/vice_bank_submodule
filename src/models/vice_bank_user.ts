import { InvalidInputError } from '../utils/errors';
import { isString, typeGuardGenerator, typeGuardTestGenerator } from 'tcheck';

export interface ViceBankUserJSON {
  id: string;
  userId: string;
  name: string;
}

const isViceBankUserJSONCommon = {
  id: isString,
  userId: isString,
  name: isString,
};
const isViceBankUserJSON = typeGuardGenerator<ViceBankUserJSON>(
  isViceBankUserJSONCommon,
);
const isViceBankUserJSONTest = typeGuardTestGenerator(isViceBankUserJSONCommon);

export class ViceBankUser {
  protected _id: string;
  protected _userId: string;
  protected _name: string;

  constructor(payload: ViceBankUserJSON) {
    this._id = payload.id;
    this._userId = payload.userId;
    this._name = payload.name;
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

  toJSON(): ViceBankUserJSON {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
    };
  }

  copyWith(input: Record<string, unknown>): ViceBankUser {
    return ViceBankUser.fromJSON({
      ...this.toJSON(),
      ...input,
    });
  }

  static fromJSON(input: unknown): ViceBankUser {
    if (!ViceBankUser.isViceBankUserJSON(input)) {
      const errors = ViceBankUser.viceBankUserJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    return new ViceBankUser(input);
  }

  static isViceBankUserJSON = isViceBankUserJSON;
  static viceBankUserJSONTest = isViceBankUserJSONTest;

  static fromNewViceBankUser(id: string, input: ViceBankUser): ViceBankUser {
    return ViceBankUser.fromJSON({
      ...input.toJSON(),
      id,
    });
  }
}
