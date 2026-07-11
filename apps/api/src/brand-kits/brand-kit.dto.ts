import { IsArray, IsHexColor, IsOptional, IsString, MaxLength } from 'class-validator';
export class BrandKitDto {
 @IsHexColor() primaryColor!:string; @IsHexColor() secondaryColor!:string; @IsHexColor() accentColor!:string;
 @IsString() headingFont!:string; @IsString() bodyFont!:string;
 @IsOptional() @IsString() @MaxLength(1000) toneOfVoice?:string;
 @IsOptional() @IsString() @MaxLength(2000) targetAudience?:string;
 @IsOptional() @IsString() @MaxLength(3000) brandStory?:string;
 @IsArray() @IsString({each:true}) products!:string[]; @IsArray() @IsString({each:true}) services!:string[];
}
