import { frequencyFromString } from './frequency';
import { Task, TaskJSON } from './task';

describe('Task', () => {
  const validInput: TaskJSON = {
    id: 'id',
    vbUserId: 'vbUserId',
    name: 'name',
    frequency: 'daily',
    tokensEarnedPerInput: 1,
  };

  describe('toJSON', () => {
    test('returns an object with the correct fields', () => {
      const task = Task.fromJSON(validInput);

      expect(task.toJSON()).toEqual(validInput);
    });
  });

  describe('fromJSON', () => {
    test('returns a new Task based on valid input', () => {
      const task = Task.fromJSON(validInput);

      expect(task).toBeInstanceOf(Task);
      expect(task.id).toBe(validInput.id);
      expect(task.vbUserId).toBe(validInput.vbUserId);
      expect(task.name).toBe(validInput.name);
      expect(task.frequency).toBe(frequencyFromString(validInput.frequency));
      expect(task.tokensEarnedPerInput).toBe(validInput.tokensEarnedPerInput);
    });

    test('throws an error if values are missing from the input', () => {
      let invalidInput: Record<string, unknown> = {};

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(() => Task.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(() => Task.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.name;
      expect(() => Task.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.frequency;
      expect(() => Task.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.tokensEarnedPerInput;
      expect(() => Task.fromJSON(invalidInput)).toThrow();
    });

    test('throws an error if the input is not an object', () => {
      expect(() => Task.fromJSON('invalidInput')).toThrow();
      expect(() => Task.fromJSON(1)).toThrow();
      expect(() => Task.fromJSON(true)).toThrow();
      expect(() => Task.fromJSON([])).toThrow();
      expect(() => Task.fromJSON(null)).toThrow();
    });
  });

  describe('isTaskJSON', () => {
    test('returns true if the input is valid', () => {
      expect(Task.isTaskJSON(validInput)).toBe(true);
    });

    test('returns false if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = {};

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(Task.isTaskJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(Task.isTaskJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.name;
      expect(Task.isTaskJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.frequency;
      expect(Task.isTaskJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.tokensEarnedPerInput;
      expect(Task.isTaskJSON(invalidInput)).toBe(false);
    });

    test('returns false if the input is not an object', () => {
      expect(Task.isTaskJSON('invalidInput')).toBe(false);
      expect(Task.isTaskJSON(1)).toBe(false);
      expect(Task.isTaskJSON(true)).toBe(false);
      expect(Task.isTaskJSON([])).toBe(false);
      expect(Task.isTaskJSON(null)).toBe(false);
    });
  });

  describe('taskJSONTest', () => {
    test('returns an empty array if the input is valid', () => {
      expect(Task.taskJSONTest(validInput)).toEqual([]);
    });

    test('returns an array of missing fields if the input is invalid', () => {
      let invalidInput: Record<string, unknown> = {};

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(Task.taskJSONTest(invalidInput)).toEqual(['id']);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(Task.taskJSONTest(invalidInput)).toEqual(['vbUserId']);

      invalidInput = { ...validInput };
      delete invalidInput.name;
      expect(Task.taskJSONTest(invalidInput)).toEqual(['name']);

      invalidInput = { ...validInput };
      delete invalidInput.frequency;
      expect(Task.taskJSONTest(invalidInput)).toEqual(['frequency']);

      invalidInput = { ...validInput };
      delete invalidInput.tokensEarnedPerInput;
      expect(Task.taskJSONTest(invalidInput)).toEqual(['tokensEarnedPerInput']);
    });

    test('returns root if the input is not an object', () => {
      expect(Task.taskJSONTest('invalidInput')).toEqual(['root']);
      expect(Task.taskJSONTest(1)).toEqual(['root']);
      expect(Task.taskJSONTest(true)).toEqual(['root']);
      expect(Task.taskJSONTest([])).toEqual(['root']);
      expect(Task.taskJSONTest(null)).toEqual(['root']);
    });
  });

  describe('fromNewTask', () => {
    test('returns a new Task instance with new id', () => {
      const task = Task.fromJSON(validInput);

      const newId = 'newId';

      const newTask = Task.fromNewTask(newId, task);

      expect(newTask.toJSON()).toEqual({
        ...task.toJSON(),
        id: newId,
      });
    });
  });
});
