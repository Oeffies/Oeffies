import { Module } from "@nestjs/common";
import { StopFinderController } from "./controller/stop_finder.controller";
import { StopFinderService } from "./service/stop_finder.service";

@Module({
  controllers: [StopFinderController],
  providers: [StopFinderService]
})
export class StopFinderModule { }