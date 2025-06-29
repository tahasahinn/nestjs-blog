import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()g
  content: string;
}
