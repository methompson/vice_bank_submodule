import { ActionJSON } from './action';
import { ActionDeposit, ActionDepositJSON } from './action_deposit';

describe('Deposit', () => {
  const action: ActionJSON = {
    id: 'id',
    vbUserId: 'vbUserId',
    name: 'name',
    conversionUnit: 'conversionUnit',
    inputQuantity: 1,
    tokensEarnedPerInput: 2,
    minDeposit: 3,
    maxDeposit: 4,
  };

  const validInput: ActionDepositJSON = {
    id: 'id',
    vbUserId: 'vbUserId',
    date: '2023-02-25T00:00:00.000-06:00',
    depositQuantity: 1,
    action,
  };

  describe('tokensEarned', () => {
    test('returns an expected value', () => {
      const deposit1 = new ActionDeposit(validInput);
      expect(deposit1.tokensEarned).toBe(2);

      const deposit2 = new ActionDeposit({
        ...validInput,
        depositQuantity: 2,
      });
      expect(deposit2.tokensEarned).toBe(4);
    });
  });

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
      expect(result.vbUserId).toBe(validInput.vbUserId);
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
      delete invalidInput.vbUserId;
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

  describe('isActionDepositJSON', () => {
    test('returns true if the input is valid', () => {
      expect(ActionDeposit.isActionDepositJSON(validInput)).toBe(true);
    });

    test('returns false if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(ActionDeposit.isActionDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(ActionDeposit.isActionDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(ActionDeposit.isActionDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.depositQuantity;
      expect(ActionDeposit.isActionDepositJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.action;
      expect(ActionDeposit.isActionDepositJSON(invalidInput)).toBe(false);
    });

    test('returns false if the input is not an object', () => {
      expect(ActionDeposit.isActionDepositJSON('invalidInput')).toBe(false);
      expect(ActionDeposit.isActionDepositJSON(1)).toBe(false);
      expect(ActionDeposit.isActionDepositJSON(true)).toBe(false);
      expect(ActionDeposit.isActionDepositJSON([])).toBe(false);
      expect(ActionDeposit.isActionDepositJSON(null)).toBe(false);
    });
  });

  describe('actionDepositJSONTest', () => {
    test('returns an empty array if the input is valid', () => {
      expect(ActionDeposit.actionDepositJSONTest(validInput)).toEqual([]);
    });

    test('returns an array of strings if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(ActionDeposit.actionDepositJSONTest(invalidInput)).toEqual(['id']);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(ActionDeposit.actionDepositJSONTest(invalidInput)).toEqual([
        'vbUserId',
      ]);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(ActionDeposit.actionDepositJSONTest(invalidInput)).toEqual([
        'date',
      ]);

      invalidInput = { ...validInput };
      delete invalidInput.depositQuantity;
      expect(ActionDeposit.actionDepositJSONTest(invalidInput)).toEqual([
        'depositQuantity',
      ]);

      invalidInput = { ...validInput };
      delete invalidInput.action;
      expect(ActionDeposit.actionDepositJSONTest(invalidInput)).toEqual([
        'action',
      ]);
    });

    test('returns root if the input is not an object', () => {
      expect(ActionDeposit.actionDepositJSONTest('invalidInput')).toEqual([
        'root',
      ]);
      expect(ActionDeposit.actionDepositJSONTest(1)).toEqual(['root']);
      expect(ActionDeposit.actionDepositJSONTest(true)).toEqual(['root']);
      expect(ActionDeposit.actionDepositJSONTest([])).toEqual(['root']);
      expect(ActionDeposit.actionDepositJSONTest(null)).toEqual(['root']);
    });
  });

  describe('fromNewDeposit', () => {
    test('returns a new Deposit based on valid input', () => {
      const depositInput = ActionDeposit.fromJSON(validInput);
      const newId = 'newId';
      const result = ActionDeposit.fromActionNewDeposit(newId, depositInput);

      expect(result instanceof ActionDeposit).toBe(true);
      expect(result.id).toBe(newId);
      expect(result.vbUserId).toBe(depositInput.vbUserId);
      expect(result.date.toISO()).toBe(depositInput.date.toISO());
      expect(result.depositQuantity).toBe(depositInput.depositQuantity);
      expect(result.action.toJSON()).toEqual(action);
    });
  });
});
