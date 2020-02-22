export class CreateEventDto {
  constructor(props) {
    Object.assign(this, props)
  }

  readonly type: string;
  readonly action: string;
  readonly userId: string;
  readonly placeId: string;
  readonly data: any;
}