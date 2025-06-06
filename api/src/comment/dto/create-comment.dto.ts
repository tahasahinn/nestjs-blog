import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';a

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
