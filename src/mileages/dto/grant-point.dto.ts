export class GrantPointDto {
  constructor(props) {
    Object.assign(this, props)
  }

  readonly grantType: string;
  readonly amount: number;
}