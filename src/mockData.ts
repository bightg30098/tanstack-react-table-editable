import { faker } from '@faker-js/faker';

export type Overview = {
  latestDate: string;
  site: string;
  electricCompareYear: number;
  electricCurrentYear: number;
  electricWeight: number;
  electricGradient: number;
  waterUseCompareYear: number;
  waterUseCurrentYear: number;
  waterUseWeight: number;
  waterUseGradient: number;
  revenueCompareYear: number;
  revenueCurrentYear: number;
  revenueWeight: number;
  revenueGradient: number;
  ASPCompareYear: number;
  ASPCurrentYear: number;
  ASPWeight: number;
  ASPGradient: number;
  subRows?: Overview[];
};

export function createOverview(): Overview {
  return {
    latestDate: faker.date.past().toLocaleDateString(),
    site: faker.address.city(),
    electricCompareYear: Number(faker.random.numeric(4)),
    electricCurrentYear: Number(faker.random.numeric(4)),
    electricWeight: Number(`0.${faker.random.numeric(3)}`),
    electricGradient: Number(`0.${faker.random.numeric(3)}`),
    waterUseCompareYear: Number(faker.random.numeric(4)),
    waterUseCurrentYear: Number(faker.random.numeric(4)),
    waterUseWeight: Number(`0.${faker.random.numeric(3)}`),
    waterUseGradient: Number(`0.${faker.random.numeric(3)}`),
    revenueCompareYear: Number(faker.random.numeric(4)),
    revenueCurrentYear: Number(faker.random.numeric(4)),
    revenueWeight: Number(`0.${faker.random.numeric(3)}`),
    revenueGradient: Number(`0.${faker.random.numeric(3)}`),
    ASPCompareYear: Number(faker.random.numeric(4)),
    ASPCurrentYear: Number(faker.random.numeric(4)),
    ASPWeight: Number(`0.${faker.random.numeric(3)}`),
    ASPGradient: Number(`0.${faker.random.numeric(3)}`)
  };
}
