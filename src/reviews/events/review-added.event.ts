export class ReviewAddedEvent {
  constructor(
    public readonly userId: string,
    public readonly data: any
  ) {}
}