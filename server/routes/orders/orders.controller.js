import {getOrdersByUserId} from "../../models/order/order.model.js";
import {finalizeOrder} from "../carts/carts.controller.js";

export async function getAllOrdersByUserId(request, response) {
  return response.status(200).json(await getOrdersByUserId(request.user._id));
}

export async function addNewOrder(request, response) {
  return response.status(201).json(await finalizeOrder(request.body.cart));
}
