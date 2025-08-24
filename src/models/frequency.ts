import { isEnumValueGenerator } from '@metools/tcheck';

export enum Frequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'monthly',
}

export const isFrequency = isEnumValueGenerator(Frequency);

export function frequencyFromString(input: string): Frequency {
  if (isFrequency(input)) {
    return input;
  } else {
    throw new Error(`Invalid frequency: ${input}`);
  }
}
