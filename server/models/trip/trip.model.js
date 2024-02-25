import {Trip} from "./trip.mongo.js";
import {publishTrips} from "../../routes/trips/trips.socket.js";

export async function tripFind(filters) {
  const { name = '', country = '', priceRange = [0, Infinity], ratingRange = [0, 6] } = filters ?? {};

  const filter = {
    name: { $regex: name, $options: 'i' },
    country: { $regex: country, $options: 'i' },
    price: { $gte: priceRange[0], $lte: priceRange[1] },
    rating: { $gte: ratingRange[0], $lte: ratingRange[1] }
  };

  return Trip.find(filter, { __v: 0 });
}


export async function updateTripFeedback(id, newFeedback) {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { $push: { feedback: newFeedback } },
      { new: true }
    );

    if (!updatedTrip) {
      throw new Error(`Wycieczka o ID ${id} nie istnieje.`);
    }

    const totalRatings = updatedTrip.feedback.reduce((sum, feedback) => {
      return sum + (feedback.rating || 0);
    }, 0);
    const totalFeedbackCount = updatedTrip.feedback.length;
    const newRating = totalFeedbackCount > 0 ? totalRatings / totalFeedbackCount : 0;

    updatedTrip.rating = newRating;
    await updatedTrip.save();

    return updatedTrip;
  } catch (error) {
    console.error('Błąd podczas aktualizacji opinii wycieczki:', error);
    throw error;
  }
}


export async function tripFindById(id) {
  return Trip.findById(id, {__v: 0});
}


export async function tripCreate(trip) {
  await Trip.create(trip);
}

export async function tripUpdate(id, trip) {
  await Trip.updateOne({_id: id}, trip)
  await publishTrips();
}

export async function tripDestroy(id) {
  await Trip.deleteOne({_id: id})
}
