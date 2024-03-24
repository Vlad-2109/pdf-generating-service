import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GeneratePdfDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  instructorName: string;

  @IsNotEmpty()
  @IsNumber()
  durationOfCourseInHours: number;
}
