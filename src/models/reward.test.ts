import { Reward, RewardJSON } from './reward';

describe('Reward', () => {
  const validInput: RewardJSON = {
    id: 'id',
    vbUserId: 'vbUserId',
    name: 'name',
    price: 1,
  };

  describe('toJSON', () => {
    test('returns an expected value', () => {
      const reward = Reward.fromJSON(validInput);

      const result = reward.toJSON();

      expect(result).toEqual(validInput);
    });
  });

  describe('fromJSON', () => {
    test('returns a new Reward based on valid input', () => {
      const result = Reward.fromJSON(validInput);
      expect(result instanceof Reward).toBe(true);
      expect(result.id).toBe('id');
      expect(result.vbUserId).toBe('vbUserId');
      expect(result.name).toBe('name');
      expect(result.price).toBe(1);
    });

    test('throws an error if values are missing from the input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(() => Reward.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(() => Reward.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.name;
      expect(() => Reward.fromJSON(invalidInput)).toThrow();

      invalidInput = { ...validInput };
      delete invalidInput.price;
      expect(() => Reward.fromJSON(invalidInput)).toThrow();
    });

    test('throws an error if the input is not an object', () => {
      expect(() => Reward.fromJSON('invalidInput')).toThrow();
      expect(() => Reward.fromJSON(1)).toThrow();
      expect(() => Reward.fromJSON(true)).toThrow();
      expect(() => Reward.fromJSON([])).toThrow();
      expect(() => Reward.fromJSON(null)).toThrow();
    });
  });

  describe('isRewardJSON', () => {
    test('returns true if the input is valid', () => {
      expect(Reward.isRewardJSON(validInput)).toBe(true);
    });

    test('returns false if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(Reward.isRewardJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(Reward.isRewardJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.name;
      expect(Reward.isRewardJSON(invalidInput)).toBe(false);

      invalidInput = { ...validInput };
      delete invalidInput.price;
      expect(Reward.isRewardJSON(invalidInput)).toBe(false);
    });

    test('returns false if the input is not an object', () => {
      expect(Reward.isRewardJSON('invalidInput')).toBe(false);
      expect(Reward.isRewardJSON(1)).toBe(false);
      expect(Reward.isRewardJSON(true)).toBe(false);
      expect(Reward.isRewardJSON([])).toBe(false);
      expect(Reward.isRewardJSON(null)).toBe(false);
    });
  });

  describe('rewardJSONTest', () => {
    test('returns an empty array if the input is valid', () => {
      expect(Reward.rewardJSONTest(validInput)).toEqual([]);
    });

    test('returns an array of strings if the input is missing any value from a valid input', () => {
      let invalidInput: Record<string, unknown> = { ...validInput };

      invalidInput = { ...validInput };
      delete invalidInput.id;
      expect(Reward.rewardJSONTest(invalidInput)).toEqual(['id']);

      invalidInput = { ...validInput };
      delete invalidInput.vbUserId;
      expect(Reward.rewardJSONTest(invalidInput)).toEqual(['vbUserId']);

      invalidInput = { ...validInput };
      delete invalidInput.name;
      expect(Reward.rewardJSONTest(invalidInput)).toEqual(['name']);

      invalidInput = { ...validInput };
      delete invalidInput.price;
      expect(Reward.rewardJSONTest(invalidInput)).toEqual(['price']);
    });

    test('returns root if the input is not an object', () => {
      expect(Reward.rewardJSONTest('invalidInput')).toEqual(['root']);
      expect(Reward.rewardJSONTest(1)).toEqual(['root']);
      expect(Reward.rewardJSONTest(true)).toEqual(['root']);
      expect(Reward.rewardJSONTest([])).toEqual(['root']);
      expect(Reward.rewardJSONTest(null)).toEqual(['root']);
    });
  });

  describe('fromNewReward', () => {
    test('returns a new Reward based on valid input', () => {
      const input = Reward.fromJSON(validInput);
      const newId = 'newId';
      const result = Reward.fromNewReward(newId, input);

      expect(result instanceof Reward).toBe(true);
      expect(result.id).toBe(newId);
      expect(result.vbUserId).toBe(input.vbUserId);
      expect(result.name).toBe(input.name);
      expect(result.price).toBe(input.price);
    });
  });
});
