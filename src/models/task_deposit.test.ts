import { TaskJSON } from './task';
import { TaskDeposit, TaskDepositJSON } from './task_deposit';

describe('TaskDeposit', () => {
  const taskJSON: TaskJSON = {
    id: 'id',
    userId: 'userid',
    name: 'name',
    frequency: 'daily',
    tokensEarnedPerInput: 1,
  };

  const validInput: TaskDepositJSON = {
    id: 'id',
    userId: 'userId',
    date: '2024-03-19T00:00:00.000-05:00',
    task: taskJSON,
  };

  describe('toJSON', () => {
    test('returns an object with the correct fields', () => {
      const taskDeposit = TaskDeposit.fromJSON(validInput);

      expect(taskDeposit.toJSON()).toEqual(validInput);
    });
  });

  describe('fromJSON', () => {
    test('returns a new Task based on valid input', () => {
      const taskDeposit = TaskDeposit.fromJSON(validInput);

      expect(taskDeposit).toBeInstanceOf(TaskDeposit);
      expect(taskDeposit.id).toBe(validInput.id);
      expect(taskDeposit.userId).toBe(validInput.userId);
      expect(taskDeposit.date.toISO()).toBe(validInput.date);
      expect(taskDeposit.task.toJSON()).toEqual(taskJSON);
    });

    test('throws an error if values are missing from the input', () => {
      let invalidInput: Record<string, unknown> = {};

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(() => TaskDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.userId;
      expect(() => TaskDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(() => TaskDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.task;
      expect(() => TaskDeposit.fromJSON(invalidInput)).toThrow();
    });

    test('throws an error if the input is not an object', () => {
      expect(() => TaskDeposit.fromJSON('invalidInput')).toThrow();
      expect(() => TaskDeposit.fromJSON(1)).toThrow();
      expect(() => TaskDeposit.fromJSON(true)).toThrow();
      expect(() => TaskDeposit.fromJSON([])).toThrow();
      expect(() => TaskDeposit.fromJSON(null)).toThrow();
    });
  });

  describe('isTaskDepositJSON', () => {
    test('returns true if the input is valid', () => {
      const result = TaskDeposit.isTaskDepositJSON(validInput);

      expect(result).toBe(true);
    });

    test('returns false if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = {};

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(TaskDeposit.isTaskDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.userId;
      expect(TaskDeposit.isTaskDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(TaskDeposit.isTaskDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.task;
      expect(TaskDeposit.isTaskDepositJSON(invalidInput)).toBe(false);
    });

    test('returns false if the input is not an object', () => {
      expect(TaskDeposit.isTaskDepositJSON('invalidInput')).toBe(false);
      expect(TaskDeposit.isTaskDepositJSON(1)).toBe(false);
      expect(TaskDeposit.isTaskDepositJSON(true)).toBe(false);
      expect(TaskDeposit.isTaskDepositJSON([])).toBe(false);
      expect(TaskDeposit.isTaskDepositJSON(null)).toBe(false);
    });
  });

  describe('TaskDepositJSONTest', () => {
    test('returns an empty array if the input is valid', () => {
      const result = TaskDeposit.TaskDepositJSONTest(validInput);

      expect(result).toEqual([]);
    });

    test('returns an array of missing fields if the input is invalid', () => {
      let invalidInput: Record<string, unknown> = {};

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(TaskDeposit.TaskDepositJSONTest(invalidInput)).toEqual(['id']);

      invalidInput = { ...validInput };
      delete invalidInput.userId;
      expect(TaskDeposit.TaskDepositJSONTest(invalidInput)).toEqual(['userId']);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(TaskDeposit.TaskDepositJSONTest(invalidInput)).toEqual(['date']);

      invalidInput = { ...validInput };
      delete invalidInput.task;
      expect(TaskDeposit.TaskDepositJSONTest(invalidInput)).toEqual(['task']);
    });

    test('returns root if the input is not an object', () => {
      expect(TaskDeposit.TaskDepositJSONTest('invalidInput')).toEqual(['root']);
      expect(TaskDeposit.TaskDepositJSONTest(1)).toEqual(['root']);
      expect(TaskDeposit.TaskDepositJSONTest(true)).toEqual(['root']);
      expect(TaskDeposit.TaskDepositJSONTest([])).toEqual(['root']);
      expect(TaskDeposit.TaskDepositJSONTest(null)).toEqual(['root']);
    });
  });

  describe('fromNewTaskDeposit', () => {
    test('returns a new TaskDeposit instance with new id', () => {
      const taskDeposit = TaskDeposit.fromJSON(validInput);
      const newId = 'new Id';

      const newTaskDeposit = TaskDeposit.fromNewTaskDeposit(newId, taskDeposit);

      expect(newTaskDeposit).toBeInstanceOf(TaskDeposit);
      expect(newTaskDeposit.id).toBe(newId);

      expect(newTaskDeposit.toJSON()).toEqual({
        ...taskDeposit.toJSON(),
        id: newId,
      });
    });
  });
});
