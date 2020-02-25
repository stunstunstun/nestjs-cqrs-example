export class ReviewModifiedEvent {
  constructor(
    public readonly userId: string,
    public readonly data: any
  ) {}
}