import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()z
  content: string;
}
