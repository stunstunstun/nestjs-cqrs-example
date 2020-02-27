export class ReviewAddedEvent {
  constructor(
    public readonly userId: string,
    public readonly placeId: string,
    public readonly data: any
  ) {}
}