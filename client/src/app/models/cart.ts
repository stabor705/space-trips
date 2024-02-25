import {Trip} from "./trip.model";

export interface CartItem {
  trip: Trip,
  quantity: number;
  value: number;
  selected?: boolean;
}

export interface Cart {
  items: CartItem[],
  total: number,
  userId: string | null;
}
