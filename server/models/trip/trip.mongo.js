import {Schema, model} from "mongoose";

const FeedbackSchema = new Schema({
  nick: {
    type: String,
    required: false,
  },

  rating:{
    type: Number,
    required: false,
  },

  title: {
    type: String,
    required: false,
  },

  comment: {
    type: String,
    required: false,
  },
  orderDate: {
    type: String,
  },
  userId: {
    type: String,
  }
})

export const TripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: String,
  description: String,
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  available: {
    type: Number,
    required: true,
    min: 0,
  },
  startAt: {
    type: Number,
    required: true,
  },
  endAt: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: String,
  gallery: [String],
  rating: {
    type: Number,
    default: 0
  },
  feedback: [FeedbackSchema]
});

export const Trip = model('Trip', TripSchema);
