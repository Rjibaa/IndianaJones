import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class GetTrajectDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z].*$/, {
    message: 'The departure city must start with an uppercase letter.',
  })
  departureCity: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z].*$/, {
    message: 'The arrival city must start with an uppercase letter.',
  })
  arrivalCity: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(5)
  @Matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time needs to be in the format "HH:MM"',
  })
  startTime: string;
}
