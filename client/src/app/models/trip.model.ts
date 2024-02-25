import {Review} from "./review";

export type TripId = string;
export interface Trip {
  _id: TripId;
  name: string;
  country: string;
  address: string;
  description: string;
  capacity: number;
  available: number;
  startAt: string;
  endAt: string;
  price: number;
  rating: number;
  imageUrl: string;
  gallery: string[];
  feedback: Review[];
}
