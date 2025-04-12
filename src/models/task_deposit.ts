import { DateTime } from 'luxon';
import { isString, typeGuardGenerator, typeGuardTestGenerator } from 'tcheck';
import { v4 as uuidv4 } from 'uuid';

import { InvalidInputError } from '../utils/errors';
import { isValidDateTimeString } from '../utils/type_guards';
import { Task, TaskJSON } from './task';

export interface TaskDepositJSON {
  id: string;
  vbUserId: string;
  date: string;
  task: TaskJSON;
}

const isTaskDepositJSONCommon = {
  id: isString,
  vbUserId: isString,
  date: isValidDateTimeString,
  task: Task.isTaskJSON,
};

const isTaskDepositJSON = typeGuardGenerator<TaskDepositJSON>(
  isTaskDepositJSONCommon,
);
const isTaskDepositJSONTest = typeGuardTestGenerator(isTaskDepositJSONCommon);

export class TaskDeposit {
  protected _id: string;
  protected _vbUserId: string;
  protected _date: DateTime<true>;
  protected _task: Task;

  constructor(input: TaskDepositJSON) {
    const date = DateTime.fromISO(input.date);
    if (!date.isValid) {
      throw new InvalidInputError('Invalid date');
    }
    this._date = date;
    this._id = input.id;
    this._vbUserId = input.vbUserId;
    this._task = new Task(input.task);
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
  get task() {
    return this._task;
  }

  get tokensEarned(): number {
    return this._task.tokensEarnedPerInput;
  }

  toJSON(): TaskDepositJSON {
    return {
      id: this.id,
      vbUserId: this.vbUserId,
      date: this.date.toISO(),
      task: this.task.toJSON(),
    };
  }

  static fromJSON(input: unknown): TaskDeposit {
    if (!TaskDeposit.isTaskDepositJSON(input)) {
      const errors = TaskDeposit.taskDepositJSONTest(input);
      throw new InvalidInputError(`Invalid JSON ${errors.join(', ')}`);
    }

    return new TaskDeposit(input);
  }

  static fromNewTaskDeposit(id: string, taskDeposit: TaskDeposit): TaskDeposit {
    return new TaskDeposit({
      ...taskDeposit.toJSON(),
      id,
    });
  }

  static fromTask(
    task: Task,
    options?: { date?: DateTime<true> },
  ): TaskDeposit {
    const date = options?.date ?? DateTime.now();
    return new TaskDeposit({
      id: uuidv4(),
      vbUserId: task.vbUserId,
      date: date.toISO(),
      task: task.toJSON(),
    });
  }

  static isTaskDepositJSON = isTaskDepositJSON;
  static taskDepositJSONTest = isTaskDepositJSONTest;
}
