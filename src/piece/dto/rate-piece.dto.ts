import {
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class RatePieceDto {
  @IsOptional()
  @IsNumberString()
  rating: number;
}
