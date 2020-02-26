export class ReviewDeletedEvent {
  constructor(
    public readonly userId: string,
    public readonly data: any
  ) {}
}