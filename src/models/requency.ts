import { isEnumValueGenerator } from 'tcheck';

import { Deposit } from '../models/deposit';
import { TaskDeposit } from '../models/task_deposit';

export enum Frequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

export const isFrequency = isEnumValueGenerator(Frequency);

export function frequencyFromString(input: string) {
  if (isFrequency(input)) {
    return input;
  } else {
    throw new Error(`Invalid frequency: ${input}`);
  }
}
