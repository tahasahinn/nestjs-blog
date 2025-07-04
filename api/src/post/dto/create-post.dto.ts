import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()s
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
a
  @IsString()
  @IsOptional()
  photo: string;

  @IsArray()
  @IsOptional()
  tags: string[];
}
