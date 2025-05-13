import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UserDocument } from 'src/user/schemas/user.schemas';
import { UpdatePostDto } from './dto/update-post.dto.';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(
    user: UserDocument,
    createPostDto: CreatePostDto,
  ): Promise<PostDocument> {
    const newPost = new this.postModel({ ...createPostDto, author: user.id });

    return newPost.save();
  }
  async findAll(
    page: number = 1,
    limit: number = 10,
    user?: UserDocument,
  ): Promise<{
    posts: PostDocument[];
    total: number;
    totalPages: number;
  }> {

    const [posts, total] = await Promise.all([
      this.postModel
        .find(user ? { author: user._id } : {})
        .populate('author', '-password -refreshToken -__v')
        .populate('commentCount')
        .skip((page - 1) * limit)
        .limit(limit),
      this.postModel.countDocuments(),
    ]);

    return { total, totalPages: Math.ceil(total / limit), posts };
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findById(id)
      .populate('author', '-password -refreshToken -__v');

    if (!post) {
      throw new NotFoundException('Gönderi bulunamadı');
    }

    return post;
  }


  async update(id: string, user: UserDocument, updatePostDto: UpdatePostDto) {

    const post = await this.postModel.findById(id);


    if (!post) {
      throw new NotFoundException('Gönderi bulunamadı');
    }

    if (post.author.toString() !== user.id) {
      throw new ForbiddenException('Bu gönderiyi güncellemeye yetkiniz yok');
    }

   
    return this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
  }


  async delete(id: string, user: UserDocument) {

    const post = await this.postModel.findById(id);


    if (!post) {
      throw new NotFoundException('Gönderi bulunamadı');
    }

    if (post.author.toString() !== user.id) {
      throw new ForbiddenException('Bu gönderiyi güncellemeye yetkiniz yok');
    }

    return this.postModel.findByIdAndDelete(id);
  }
}
