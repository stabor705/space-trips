import {Order} from "./order.mongo.js";

export async function getOrdersByUserId(userId) {
  return Order.find({userId}, {_id: 0, __v: 0})
}


