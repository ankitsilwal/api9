import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { CreateDto } from "./dto/create.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private authModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createuser(creatdto: CreateDto) {
    const { username, password, role, pnumber } = creatdto;
    const hashedpassword = await bcrypt.hash(password,10);
    const usercreation = await this.authModel.create({
      ...creatdto,
      password: hashedpassword,
    });
    if (!usercreation) {
      throw new BadRequestException(`Please Enter Please Details`);
    }
    return usercreation;
  }

  async findbyusername(username: string) {
    const find = await this.authModel.findOne({ username });
    return find;
  }

  async login(username: string, password: string) {
    const usersign = await this.findbyusername(username);
    if (!usersign) {
      throw new UnauthorizedException(`Username not found`);
    }

    const validPassword = await bcrypt.compare(password, usersign.password);
    if (!validPassword) {
      throw new UnauthorizedException(`Password does not matched`);
    }

    const payload = { sub: usersign.id, role: usersign.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });
    return { accessToken };
  }
}
