import { ActionJSON } from './action';
import { ActionDeposit, ActionDepositJSON } from './action_deposit';

describe('Deposit', () => {
  const action: ActionJSON = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    conversionUnit: 'conversionUnit',
    inputQuantity: 1,
    tokensEarnedPerInput: 2,
    minDeposit: 3,
    maxDeposit: 4,
  };

  const validInput: ActionDepositJSON = {
    id: 'id',
    userId: 'userId',
    date: '2023-02-25T00:00:00.000-06:00',
    depositQuantity: 1,
    action,
  };

  describe('toJSON', () => {
    test('returns an expected value', () => {
      const deposit = ActionDeposit.fromJSON(validInput);

      const result = deposit.toJSON();

      expect(result).toEqual(validInput);
    });
  });

  describe('fromJSON', () => {
    test('returns a new Deposit based on valid input', () => {
      const result = ActionDeposit.fromJSON(validInput);
      expect(result instanceof ActionDeposit).toBe(true);
      expect(result.id).toBe(validInput.id);
      expect(result.userId).toBe(validInput.userId);
      expect(result.date.toISO()).toBe(validInput.date);
      expect(result.depositQuantity).toBe(validInput.depositQuantity);
      expect(result.action.toJSON()).toEqual(action);
    });

    test('throws an error if values are missing from the input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(() => ActionDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.userId;
      expect(() => ActionDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(() => ActionDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.depositQuantity;
      expect(() => ActionDeposit.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.action;
      expect(() => ActionDeposit.fromJSON(invalidInput)).toThrow();
    });

    test('throws an error if the input is not an object', () => {
      expect(() => ActionDeposit.fromJSON('invalidInput')).toThrow();
      expect(() => ActionDeposit.fromJSON(1)).toThrow();
      expect(() => ActionDeposit.fromJSON(true)).toThrow();
      expect(() => ActionDeposit.fromJSON([])).toThrow();
      expect(() => ActionDeposit.fromJSON(null)).toThrow();
    });
  });

  describe('isDepositJSON', () => {
    test('returns true if the input is valid', () => {
      expect(ActionDeposit.isDepositJSON(validInput)).toBe(true);
    });

    test('returns false if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(ActionDeposit.isDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.userId;
      expect(ActionDeposit.isDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(ActionDeposit.isDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.depositQuantity;
      expect(ActionDeposit.isDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.action;
      expect(ActionDeposit.isDepositJSON(invalidInput)).toBe(false);
    });

    test('returns false if the input is not an object', () => {
      expect(ActionDeposit.isDepositJSON('invalidInput')).toBe(false);
      expect(ActionDeposit.isDepositJSON(1)).toBe(false);
      expect(ActionDeposit.isDepositJSON(true)).toBe(false);
      expect(ActionDeposit.isDepositJSON([])).toBe(false);
      expect(ActionDeposit.isDepositJSON(null)).toBe(false);
    });
  });

  describe('DepositJSONTest', () => {
    test('returns an empty array if the input is valid', () => {
      expect(ActionDeposit.DepositJSONTest(validInput)).toEqual([]);
    });

    test('returns an array of strings if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(ActionDeposit.DepositJSONTest(invalidInput)).toEqual(['id']);

      invalidInput = { ...validInput };
      delete invalidInput.userId;
      expect(ActionDeposit.DepositJSONTest(invalidInput)).toEqual(['userId']);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(ActionDeposit.DepositJSONTest(invalidInput)).toEqual(['date']);

      invalidInput = { ...validInput };
      delete invalidInput.depositQuantity;
      expect(ActionDeposit.DepositJSONTest(invalidInput)).toEqual([
        'depositQuantity',
      ]);

      invalidInput = { ...validInput };
      delete invalidInput.action;
      expect(ActionDeposit.DepositJSONTest(invalidInput)).toEqual(['action']);
    });

    test('returns root if the input is not an object', () => {
      expect(ActionDeposit.DepositJSONTest('invalidInput')).toEqual(['root']);
      expect(ActionDeposit.DepositJSONTest(1)).toEqual(['root']);
      expect(ActionDeposit.DepositJSONTest(true)).toEqual(['root']);
      expect(ActionDeposit.DepositJSONTest([])).toEqual(['root']);
      expect(ActionDeposit.DepositJSONTest(null)).toEqual(['root']);
    });
  });

  describe('fromNewDeposit', () => {
    test('returns a new Deposit based on valid input', () => {
      const depositInput = ActionDeposit.fromJSON(validInput);
      const newId = 'newId';
      const result = ActionDeposit.fromActionNewDeposit(newId, depositInput);

      expect(result instanceof ActionDeposit).toBe(true);
      expect(result.id).toBe(newId);
      expect(result.userId).toBe(depositInput.userId);
      expect(result.date.toISO()).toBe(depositInput.date.toISO());
      expect(result.depositQuantity).toBe(depositInput.depositQuantity);
      expect(result.action.toJSON()).toEqual(action);
    });
  });
});
