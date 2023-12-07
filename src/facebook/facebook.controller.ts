import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
  Param,
  NotFoundException,
  Put,
  Delete,
} from "@nestjs/common";
import { FacebookService } from "./facebook.service";
import { CreatePost } from "./dto/createpost.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { UserRoles } from "src/auth/decorator/roles.decorator";
import { UserRole } from "src/auth/dto/create.dto";
import mongoose from "mongoose";
import { UpdatePost } from "./dto/updatepost.dto";

@UseGuards(AuthGuard, RolesGuard)
@Controller("facebook")
export class FacebookController {
  constructor(private facebookservice: FacebookService) {}

  @UserRoles(UserRole.ADMIN)
  @Post("add")
  async postcreation(@Body() createpostdto: CreatePost, @Request() req: any) {
    try {
      const authorid = req.user.sub;
      return await this.facebookservice.createpost(createpostdto, authorid);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @Get()
  async get() {
    return await this.facebookservice.get();
  }

  @Get(":id")
  async getbyid(
    @Param("id") facebookid: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    try {
      const authorid: mongoose.Types.ObjectId = req.user.sub;
      return await this.facebookservice.getbyid(facebookid, authorid);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(":id")
  async updatebyid(
    @Param("id") facebookId: mongoose.Types.ObjectId,
    @Body() updatedto: UpdatePost,
    @Request() req: any
  ) {
    try {
      const authorid = req.user.sub;
      return await this.facebookservice.updatebyid(
        facebookId,
        authorid,
        updatedto
      );
    } catch (error) {}
  }

  @Delete(":id")
  async deletepost(
    @Param("id") facebookId: mongoose.Types.ObjectId,
    @Request() req: any
  ) {
    const authorId = req.user.sub;
    return await this.facebookservice.deletebyid(facebookId, authorId);
  }
}
