import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ required: true })
  tags: string[];

  @Prop()
  photo: string;

  commentCount?: number;

  likeCount?: number;

  shareCount?: number;
}

const PostSchema = SchemaFactory.createForClass(Post);


PostSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true,
});


PostSchema.virtual('likeCount').get(function () {
  return Math.floor(Math.random() * 100);
});

PostSchema.virtual('shareCount').get(function () {
  return Math.floor(Math.random() * 50);
});

export { PostSchema };
