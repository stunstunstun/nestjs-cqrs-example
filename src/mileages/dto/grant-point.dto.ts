import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { GrantType } from 'src/mileages/mileages.enum';

export class GrantPointDto {
  constructor(props) {
    Object.assign(this, props);
  }

  @IsEnum(GrantType)
  @IsNotEmpty()
  readonly grantType: GrantType;

  @IsNumber()
  @Transform(value => Number(value))
  readonly amount: number;
}