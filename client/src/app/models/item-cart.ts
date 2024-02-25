import {TripId} from "./trip.model";

export interface ItemCart {
  tripId: TripId;
  name: string;
  country: string;
  description: string;
  price: number;
  startAt: string;
  endAt: string;
  total: number;
  count: number;
  isSelected: boolean;
  imageUrl: string;
}
