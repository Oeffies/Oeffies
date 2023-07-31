import { Module } from "@nestjs/common";
import { AppController } from "./app/controller/app.controller";
import { AppService } from "./app/service/app.service";
import { StopFinderModule } from "./stop_finder/stop_finder.module";
import { UsersModule } from "./users/users.module";
import { TripQueryModule } from "./trip_query/trip_query.module";

@Module({
  imports: [UsersModule, StopFinderModule, TripQueryModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
