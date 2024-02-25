import {Cart} from "./cart.mongo.js";


export async function cartFindById(id) {
  return Cart.findOne({_id: id}, {__v: 0})
}

export async function cartFindByUserId(userId) {
  return Cart.findOne({userId}, {__v: 0})
}

export async function cartFindByUserIdOrCreate(userId) {
  return Cart.findOneAndUpdate({userId}, {userId}, {new: true, upsert: true})
}

export async function cartCreate(cart) {
  return Cart.create(cart);
}

export async function cartUpdate(id, trip) {
  await Cart.updateOne({_id: id}, trip)
}

export async function cartDestroy(id) {
  await Cart.deleteOne({_id: id})
}
export async function clearCartItems(userId, items) {
  const itemIdsToRemove = items.map(item => item._id); // Pobierz _id zakupionych przedmiotów
  await Cart.updateOne(
    { userId: userId },
    { $pull: { items: { _id: { $in: itemIdsToRemove } } } } // Usuń przedmioty z koszyka na podstawie _id
  );

  return await Cart.findOne({ userId: userId }); // Zwróć zaktualizowany koszyk
}

