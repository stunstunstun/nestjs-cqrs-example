export class IncreasedPointEvent {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
  ) {}
}