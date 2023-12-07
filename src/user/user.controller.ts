import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import mongoose from "mongoose";
import { UpdateDto } from "./dto/update.dto";

@Controller("user")
export class UserController {
  constructor(private userservive: UserService) {}

  @Get()
  async getall() {
    return await this.userservive.getall();
  }

  @Get(":id")
  async getbyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      return await this.userservive.getbyid(userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(":id")
  async updatbyid(
    @Param("id") userId: mongoose.Types.ObjectId,
    @Body() updatedto: UpdateDto
  ) {
    try {
      return await this.userservive.updatebyid(userId, updatedto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(":id")
  async deletebyid(@Param("id") userId: mongoose.Types.ObjectId) {
    try {
      const deleteduser = await this.userservive.deletebyid(userId);
      return { message: "User Deleted" };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
