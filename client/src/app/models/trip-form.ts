import {Trip} from "./trip.model";

export type TripForm = Omit<Trip, "_id" | "startAt" | "endAt"> & {
  dateRange: Date[];
}

export type TripFormDTO = Omit<TripForm, "dateRange"> & {
  startAt: number,
  endAt: number,
}
