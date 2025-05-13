import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserDocument } from 'src/user/schemas/user.schemas';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly postService: PostService,
  ) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
    user: UserDocument,
  ) {
    await this.postService.findOne(postId);

    const newComment = new this.commentModel({
      ...createCommentDto,
      post: postId,
      author: user.id,
    });

    return await newComment.save();
  }

  async delete(id: string, user: UserDocument) {
    const comment = await this.commentModel.findById(id);

    if (!comment) {
      throw new NotFoundException(`Yorum bulunamadı`);
    }

    if (comment.author.toString() !== (user._id as string).toString()) {
      throw new NotFoundException('Bu yorumu silmeye yetkiniz yok');
    }

    await this.commentModel.findByIdAndDelete(id);

    return { message: 'Yorum başarıyla silindi' };
  }

  async findAllByPost(postId: string) {
    await this.postService.findOne(postId);

    return this.commentModel
      .find({ post: postId })
      .populate('author', '-password -refreshToken -__v')
      .sort({ createdAt: -1 });
  }
}
