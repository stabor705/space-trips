import {
  tripCreate,
  tripDestroy,
  tripFind,
  tripFindById,
  tripUpdate,
  updateTripFeedback
} from "../../models/trip/trip.model.js";
import {publishTrips} from "./trips.socket.js";

export async function findTrips(request, response) {
  return response.status(200).json(await tripFind(request.query))
}

export async function findTripById(request, response) {
  return response.status(200).json(await tripFindById(request.params.id))
}

export async function createTrip(request, response) {
  try {
    return response.status(201).json(await tripCreate(request.body))
  } catch (e) {
    return response.status(400).json({message: 'Dodawanie wycieczki nie jest możliwe'});
  }
}

export async function updateTrip(request, response) {
  try {
    return response.status(200).json(await tripUpdate(request.params.id, request.body))
  } catch (e) {
    return response.status(400).json({message: 'Edytowanie wycieczki nie jest możliwe'});
  }

}

export async function deleteTrip(request, response) {
  try{
    return response.status(204).json(await tripDestroy(request.params.id))
  }
  catch (e) {
    return response.status(400).json({message: 'Usuwanie wycieczki nie jest możliwe'});
  }
}

export async function addFeedbackByTripId(request, response) {
  const {id} = request.params;
  const {_id} = request.user;
  const {feedback} = request.body;

  const trip = await tripFindById(id);

  trip.feedback.push({...feedback, userId: _id});
  return response.status(200).json(await updateTripFeedback(id, trip))
}

export async function removeFeedback(request, response) {
  const {tripId, feedbackId} = request.params;
  try {
    const trip = await tripFindById(tripId);
    trip.feedback = trip.feedback.filter(item => item._id.valueOf() !== feedbackId);
    return response.status(200).json(await updateTripFeedback(tripId, trip));
  } catch (e) {
    return response.status(400).json({ message: 'Usuwanie recenzji nie powiodło się'})
  }
}
