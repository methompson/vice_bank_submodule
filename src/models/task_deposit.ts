import { DateTime } from 'luxon';
import { isString, typeGuardGenerator, typeGuardTestGenerator } from 'tcheck';

import { InvalidInputError } from '../utils/errors';
import { isValidDateTimeString } from '../utils/type_guards';
import { Task, TaskJSON } from './task';

export interface TaskDepositJSON {
  id: string;
  userId: string;
  date: string;
  task: TaskJSON;
}

const isTaskDepositJSONCommon = {
  id: isString,
  userId: isString,
  date: isValidDateTimeString,
  task: Task.isTaskJSON,
};

const isTaskDepositJSON = typeGuardGenerator<TaskDepositJSON>(
  isTaskDepositJSONCommon,
);
const isTaskDepositJSONTest = typeGuardTestGenerator(isTaskDepositJSONCommon);

export class TaskDeposit {
  protected _id: string;
  protected _userId: string;
  protected _date: DateTime<true>;
  protected _task: Task;

  constructor(input: TaskDepositJSON) {
    const date = DateTime.fromISO(input.date);
    if (!date.isValid) {
      throw new InvalidInputError('Invalid date');
    }
    this._date = date;
    this._id = input.id;
    this._userId = input.userId;
    this._task = new Task(input.task);
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
  get task() {
    return this._task;
  }

  toJSON(): TaskDepositJSON {
    return {
      id: this.id,
      userId: this.userId,
      date: this.date.toISO(),
      task: this.task.toJSON(),
    };
  }

  static fromJSON(input: unknown): TaskDeposit {
    if (!TaskDeposit.isTaskDepositJSON(input)) {
      const errors = TaskDeposit.TaskDepositJSONTest(input);
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

  static isTaskDepositJSON = isTaskDepositJSON;
  static TaskDepositJSONTest = isTaskDepositJSONTest;
}
