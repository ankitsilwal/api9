import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Facebook } from "./facebook.schema";
import mongoose, { Model } from "mongoose";
import { CreatePost } from "./dto/createpost.dto";
import { UpdatePost } from "./dto/updatepost.dto";

@Injectable()
export class FacebookService {
  constructor(
    @InjectModel(Facebook.name) private facebookModel: Model<Facebook>
  ) {}

  async createpost(createpostdto: CreatePost, authorid: string) {
    const postcreation = await this.facebookModel.create({
      ...createpostdto,
      author: new mongoose.Types.ObjectId(authorid),
    });
    if (!postcreation) {
      throw new BadRequestException(`Invalid Cradentials`);
    }
    return postcreation;
  }

  async get() {
    const getpost = await this.facebookModel
      .find()
      .populate("author", { password: 0, role: 0 });
    return getpost;
  }

  async getbyid(
    facebookid: mongoose.Types.ObjectId,
    authorid: mongoose.Types.ObjectId
  ): Promise<Facebook> {
    const getpost = await this.facebookModel
      .findOne({
        _id: facebookid,
        author: new mongoose.Types.ObjectId(authorid),
      })
      .populate("author", { password: 0, role: 0 });
    if (!getpost) {
      throw new NotFoundException(`Post not found`);
    }
    return getpost;
  }

  async updatebyid(
    facebookid: mongoose.Types.ObjectId,
    authorid: mongoose.Types.ObjectId,
    updatedto: UpdatePost
  ) {
    const update = await this.facebookModel.findOneAndUpdate(
      { _id: facebookid, author: new mongoose.Types.ObjectId(authorid) },
      updatedto,
      { new: true }
    );
    if (!update) {
      throw new NotFoundException(`Post not Found`);
    }
    return update;
  }

  async deletebyid(
    facebookId: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId
  ) {
    const deletepost = await this.facebookModel.findOneAndDelete({
      _id: facebookId,
      author: authorId,
    });
    if (!deletepost) {
      throw new NotFoundException(`Post not found`);
    }

    return deletepost;
  }
}
