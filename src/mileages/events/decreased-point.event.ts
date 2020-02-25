export class DecreasedPointEvent {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
  ) {}
}