import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Facebook, FacebookSchema } from "./facebook.schema";
import { FacebookController } from "./facebook.controller";
import { FacebookService } from "./facebook.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Facebook.name, schema: FacebookSchema },
    ]),
  ],
  controllers: [FacebookController],
  providers: [FacebookService, AuthGuard, RolesGuard, JwtService],
})
export class FacebookModule {}
