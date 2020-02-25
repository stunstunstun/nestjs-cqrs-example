export class ReviewPlaceEvent {
  constructor(
    public readonly userId: string,
    public readonly placeId: string,
  ) {}
}