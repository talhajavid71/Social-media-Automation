import { IsEmail, IsIn, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
export class ClientDto {
  @IsString() @MinLength(2) @MaxLength(100) name!: string;
  @IsString() @MinLength(2) @MaxLength(100) industry!: string;
  @IsOptional() @IsString() contactName?: string;
  @IsOptional() @IsEmail() contactEmail?: string;
  @IsOptional() @IsUrl({require_protocol:true}) website?: string;
  @IsOptional() @IsString() timezone?: string;
  @IsOptional() @IsString() @MaxLength(1000) marketingGoals?: string;
  @IsOptional() @IsIn(['ACTIVE','ARCHIVED']) status?: 'ACTIVE'|'ARCHIVED';
}
