import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "src/auth/user.schema";
import { UpdateDto } from "./dto/update.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getall(): Promise<User[]> {
    return await this.userModel.find({}, { password: 0 });
  }

  async getbyid(userid: mongoose.Types.ObjectId): Promise<User> {
    const getuser = await this.userModel.findById(userid, { password: 0 });
    if (!getuser) {
      throw new NotFoundException(`User not found`);
    }
    return getuser;
  }

  async updatebyid(
    userid: mongoose.Types.ObjectId,
    updatdto: UpdateDto
  ): Promise<User> {
    const { username, password, role, pnumber } = updatdto;
    const hashedpassword = await bcrypt.hash(password,10);
    const updateuser = await this.userModel.findByIdAndUpdate(userid, {
      ...updatdto,
      password: hashedpassword,
    },
    {new:true});
    if (!updateuser) {
      throw new NotFoundException(`User not found`);
    }
    return updateuser;
  }

  async deletebyid(userid: mongoose.Types.ObjectId) {
    const deleteuser = await this.userModel.findByIdAndDelete(userid);
    if (!deleteuser) {
      throw new NotFoundException(`User not found`);
    }
    return deleteuser;
  }
}
