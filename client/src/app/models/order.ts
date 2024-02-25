import {Cart} from "./cart";

export type Order = Cart & {
  status: string;
  createdAt: string;
}
