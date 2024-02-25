import {model, Schema} from "mongoose";
import {TripSchema} from "../trip/trip.mongo.js";

export const CartItemSchema = new Schema({
  trip: {
    type: TripSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true,
    default: 0,
  },
})

export const CartSchema = new Schema({
  items: {
    type: [CartItemSchema],
    default: [],
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  userId: {
    type:  String,
    default: null,
  }
});

CartSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, (err, result) => {
    return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  })
}

export const Cart = model('Cart', CartSchema)
