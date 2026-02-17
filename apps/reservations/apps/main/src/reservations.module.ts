import { Module } from "@nestjs/common";
import { ReservationsService } from "./service/reservations.service";
import { ReservationsController } from "./controller/reservations.controller";
import { DatabaseModule, LoggerModule } from "@app/common";
import { ReservationRepository } from "./reservation.repository";
import {
  ReservationDocument,
  ReservationSchema,
} from "./models/reservation.schema";

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
