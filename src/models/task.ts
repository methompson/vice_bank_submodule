import {
  isNumber,
  isString,
  typeGuardGenerator,
  typeGuardTestGenerator,
} from 'tcheck';

import { InvalidInputError } from '../utils/errors';
import { Frequency, frequencyFromString, isFrequency } from './frequency';

export interface TaskJSON {
  id: string;
  vbUserId: string;
  name: string;
  frequency: string;
  tokensEarnedPerInput: number;
}

const isTaskJSONCommon = {
  id: isString,
  vbUserId: isString,
  name: isString,
  frequency: isFrequency,
  tokensEarnedPerInput: isNumber,
};

const isTaskJSON = typeGuardGenerator<TaskJSON>(isTaskJSONCommon);
const isTaskJSONTest = typeGuardTestGenerator(isTaskJSONCommon);

export class Task {
  protected _id: string;
  protected _vbUserId: string;
  protected _name: string;
  protected _frequency: Frequency;
  protected _tokensEarnedPerInput: number;

  constructor(payload: TaskJSON) {
    this._id = payload.id;
    this._vbUserId = payload.vbUserId;
    this._name = payload.name;
    this._frequency = frequencyFromString(payload.frequency);
    this._tokensEarnedPerInput = payload.tokensEarnedPerInput;
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
  get frequency(): Frequency {
    return this._frequency;
  }
  get tokensEarnedPerInput(): number {
    return this._tokensEarnedPerInput;
  }

  toJSON(): TaskJSON {
    return {
      id: this.id,
      vbUserId: this.vbUserId,
      name: this.name,
      frequency: this.frequency,
      tokensEarnedPerInput: this.tokensEarnedPerInput,
    };
  }

  static fromJSON(input: unknown): Task {
    if (!Task.isTaskJSON(input)) {
      const errors = Task.taskJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    return new Task(input);
  }

  static isTaskJSON = isTaskJSON;
  static taskJSONTest = isTaskJSONTest;

  static fromNewTask(id: string, input: Task): Task {
    return new Task({ ...input.toJSON(), id });
  }
}
