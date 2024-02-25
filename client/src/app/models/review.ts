export interface Review {
  _id?: string;
  rating: number | null;
  nick: string | null;
  userId: string;
  title?: string | null;
  comment?: string | null;
  orderDate?: string | null;
}
