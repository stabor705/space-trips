import {cartCreate, cartDestroy, cartFindByUserId, cartFindByUserIdOrCreate} from "../../models/cart/cart.model.js";
import {Order} from "../../models/order/order.mongo.js";
import {Cart} from "../../models/cart/cart.mongo.js";
import {Trip} from "../../models/trip/trip.mongo.js";

export async function getCart(request, response) {
  return response.json(await cartFindById(request.params.id))
}

export async function getCartByUserId(request, response) {
  const {userId} = request.body;
  if (userId) {
    return response.status(200).json(await cartFindByUserIdOrCreate(userId));
  } else {
    return response.status(400).json({message: 'Niepoprawne dane użytkownika'});
  }
}

export async function updateItemInCart(request, response) {
  const {userId, cartItem} = request.body;
  try {
    const cart = await cartFindByUserId(userId);
    cart.items = cart.items.map(item => {
      if (item.trip._id.valueOf() === cartItem.trip._id.valueOf()) {
        return {...cartItem, value: calculateValue(item.trip, cartItem.quantity)};
      }
      return item;
    });
    cart.total = calculateTotal(cart.items);
    return response.status(200).json(await cart.save());
  } catch (e) {
    return response.status(400).json({message: 'Niepoprawne dane użytkownika'});
  }

}

export async function deleteCart(request, response) {
  return response.status(204).json(await cartDestroy(request.body.id))
}

export async function addToCart(request, response) {
  const {userId, trip, quantity} = request.body;
  if (!userId) {
    return response.status(400).json({message: 'Niepoprawne dane użytkownika'});
  }

  const cart = await cartFindByUserIdOrCreate(userId)
  const updatedCart = addOrUpdateItems(cart, trip, quantity);
  try {
    return response.status(200).json(await updatedCart.save());
  } catch (e) {
    return response.status(400).json({message: e})
  }
}

export async function removeFromCart(request, response) {
  const {userId, cartItem} = request.body;
  const cart = await cartFindByUserId(userId);
  cart.items = cart.items.filter(item => item.trip._id.valueOf() !== cartItem.trip._id.valueOf());
  cart.total = calculateTotal(cart.items);
  try {
    return response.status(200).json(await cart.save());
  } catch (e) {
    return response.status(400).json({message: e})
  }
}

async function createCart(trip, quantity, userId) {
  return cartCreate(createNewCart(trip, quantity, userId))
}

function addOrUpdateItems(cart, trip, quantity) {
  const {items} = cart;
  const shouldUpdateItem = items.some(item => item.trip._id.valueOf() === trip._id.valueOf());
  if (shouldUpdateItem) {
    const updatedItems = items.map(item =>
      item.trip._id.valueOf() === trip._id.valueOf()
        ? updateCartItem(item, trip, quantity)
        : item
    );
    cart.items = updatedItems;
    cart.total = calculateTotal(updatedItems);
  } else {
    cart.items.push(createCartItem(trip, quantity));
    cart.total = calculateTotal(cart.items);
  }
  return cart;
}

function updateCartItem(item, trip, quantity) {
  return {trip, quantity: item.quantity + quantity, value: calculateValue(trip, item.quantity + quantity)}
}

function createNewCart(item, quantity, userId) {
  const items = [createCartItem(item, quantity)];
  return {
    items,
    userId,
    total: calculateTotal(items)
  }
}

function createCartItem(trip, quantity) {
  return {
    trip,
    quantity,
    value: calculateValue(trip, quantity)
  }
}

function calculateValue(trip, quantity) {
  return parseInt(trip.price) * parseInt(quantity);
}

function calculateTotal(items) {
  return items.reduce((value, item) => {
    return value + calculateValue(item.trip, item.quantity);
  }, 0);
}

export async function finalizeOrder(request, response) {
  try {
    const {userId, cart} = request.body;

    const selectedCartItems = cart.items.filter(item => item.selected)
    const newOrder = {
      userId,
      items: selectedCartItems,
      total: calculateTotal(selectedCartItems)
    };

    const leftItems = cart.items.filter(item => !item.selected)
    const cartToUpdate = {
      userId,
      items: leftItems,
      total: calculateTotal(leftItems)
    }

    try {
      await Order.create(newOrder);
    } catch (e) {
      return response.status(400).json(e)
    }

    for (const item of cart.items) {
      try {
        await Trip.findByIdAndUpdate(item.trip, {$inc: {available: -item.quantity}});
      } catch (e) {
        return response.status(400).json(e)
      }

    }

    return response.status(201).json(await Cart.findOneAndUpdate({userId}, cartToUpdate, { new: true }));
  } catch (error) {
    return response.status(500).json({message: 'Error creating order'});
  }
}
