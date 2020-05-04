import {
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsIn,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { ProgressStatus } from '../../common/enums';

export class SaveProgressDto {
  @IsOptional()
  @IsNumberString()
  rating: number;

  @IsOptional()
  comment: string;

  @IsOptional()
  @IsDateString()
  finishedTime: Date;

  @IsOptional()
  @IsIn([
    ProgressStatus.PENDING,
    ProgressStatus.FINISHED,
    ProgressStatus.IN_PROGRESS,
  ])
  status: ProgressStatus;

  @IsNotEmpty()
  @IsUUID('4')
  pieceId: string;
}
