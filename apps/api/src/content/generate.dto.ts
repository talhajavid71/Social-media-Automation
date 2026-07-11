import { IsIn, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
export class GenerateContentDto {
 @IsString() @MinLength(3) @MaxLength(1000) brief!:string;
 @IsInt() @Min(1) @Max(30) days!:number;
 @IsIn(['FACEBOOK','INSTAGRAM','LINKEDIN','GOOGLE_BUSINESS'],{each:true}) platforms!:string[];
}
