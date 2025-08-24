import { Purchase, PurchaseJSON } from './purchase';
import { RewardJSON } from './reward';

describe('Purchase', () => {
  const rewardJSON: RewardJSON = {
    id: 'id',
    vbUserId: 'vbUserId',
    name: 'name',
    price: 1,
  };

  const validInput: PurchaseJSON = {
    id: 'id',
    vbUserId: 'vbUserId',
    date: '2023-02-25T00:00:00.000-06:00',
    purchasedQuantity: 1,
    reward: rewardJSON,
  };

  describe('toJSON', () => {
    test('returns an expected value', () => {
      const purchase = Purchase.fromJSON(validInput);

      const result = purchase.toJSON();

      expect(result).toEqual(validInput);
    });
  });

  describe('fromJSON', () => {
    test('returns a new Purchase based on valid input', () => {
      const result = Purchase.fromJSON(validInput);
      expect(result instanceof Purchase).toBe(true);
      expect(result.id).toBe('id');
      expect(result.vbUserId).toBe('vbUserId');
      expect(result.date.toISO()).toBe('2023-02-25T00:00:00.000-06:00');
      expect(result.purchasedQuantity).toBe(1);
      expect(result.reward.toJSON()).toEqual(rewardJSON);
    });

    test('throws an error if values are missing from the input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(() => Purchase.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(() => Purchase.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(() => Purchase.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.purchasedQuantity;
      expect(() => Purchase.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.reward;
      expect(() => Purchase.fromJSON(invalidInput)).toThrow();
    });

    test('throws an error if the input is not an object', () => {
      expect(() => Purchase.fromJSON('invalidInput')).toThrow();
      expect(() => Purchase.fromJSON(1)).toThrow();
      expect(() => Purchase.fromJSON(true)).toThrow();
      expect(() => Purchase.fromJSON([])).toThrow();
      expect(() => Purchase.fromJSON(null)).toThrow();
    });
  });

  describe('isPurchaseJSON', () => {
    test('returns true if the input is valid', () => {
      expect(Purchase.isPurchaseJSON(validInput)).toBe(true);
    });

    test('returns false if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(Purchase.isPurchaseJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(Purchase.isPurchaseJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(Purchase.isPurchaseJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.purchasedQuantity;
      expect(Purchase.isPurchaseJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.reward;
      expect(Purchase.isPurchaseJSON(invalidInput)).toBe(false);
    });

    test('returns false if the input is not an object', () => {
      expect(Purchase.isPurchaseJSON('invalidInput')).toBe(false);
      expect(Purchase.isPurchaseJSON(1)).toBe(false);
      expect(Purchase.isPurchaseJSON(true)).toBe(false);
      expect(Purchase.isPurchaseJSON([])).toBe(false);
      expect(Purchase.isPurchaseJSON(null)).toBe(false);
    });
  });

  describe('purchaseJSONTest', () => {
    test('returns an empty array if the input is valid', () => {
      expect(Purchase.purchaseJSONTest(validInput)).toEqual([]);
    });

    test('returns an array of strings if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(Purchase.purchaseJSONTest(invalidInput)).toEqual(['id']);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(Purchase.purchaseJSONTest(invalidInput)).toEqual(['vbUserId']);

      invalidInput = { ...validInput };
      delete invalidInput.date;
      expect(Purchase.purchaseJSONTest(invalidInput)).toEqual(['date']);

      invalidInput = { ...validInput };
      delete invalidInput.purchasedQuantity;
      expect(Purchase.purchaseJSONTest(invalidInput)).toEqual([
        'purchasedQuantity',
      ]);

      invalidInput = { ...validInput };
      delete invalidInput.reward;
      expect(Purchase.purchaseJSONTest(invalidInput)).toEqual(['reward']);
    });

    test('returns root if the input is not an object', () => {
      expect(Purchase.purchaseJSONTest('invalidInput')).toEqual(['root']);
      expect(Purchase.purchaseJSONTest(1)).toEqual(['root']);
      expect(Purchase.purchaseJSONTest(true)).toEqual(['root']);
      expect(Purchase.purchaseJSONTest([])).toEqual(['root']);
      expect(Purchase.purchaseJSONTest(null)).toEqual(['root']);
    });
  });

  describe('fromNewPurchase', () => {
    test('returns a new Purchase based on valid input', () => {
      const purchaseInput = Purchase.fromJSON(validInput);
      const newId = 'newId';
      const result = Purchase.fromNewPurchase(newId, purchaseInput);

      expect(result instanceof Purchase).toBe(true);
      expect(result.id).toBe(newId);
      expect(result.vbUserId).toBe(purchaseInput.vbUserId);
      expect(result.date.toISO()).toBe(purchaseInput.date.toISO());
      expect(result.purchasedQuantity).toBe(purchaseInput.purchasedQuantity);
      expect(result.reward.toJSON()).toEqual(rewardJSON);
    });
  });
});
