export interface IDateProvider {
  add(quantity: number, measureTime: string): Date;
}
