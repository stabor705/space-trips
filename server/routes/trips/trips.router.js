import {Router} from "express";
import {
  addFeedbackByTripId,
  createTrip,
  deleteTrip,
  findTripById,
  findTrips,
  removeFeedback,
  updateTrip
} from "./trips.controller.js";
import {socketConnectionRequest} from "./trips.socket.js";
import {singleSession} from "../../middleware/session.js";
import {authenticate} from "../../middleware/authenticate.js";
import {isAdmin} from "../../middleware/authAdmin.js";
import {isAdminOrManager} from "../../middleware/isAdminOrManager.js";

const tripsRouter = Router()

tripsRouter.get('/trips',
  singleSession,
  findTrips
);
tripsRouter.get('/trips/socket',
  singleSession,
  socketConnectionRequest
);
tripsRouter.get('/trips/:id',
  singleSession,
  findTripById
);
tripsRouter.post('/trips/:id/feedback',
  singleSession,
  authenticate,
  addFeedbackByTripId
);
tripsRouter.delete('/trips/:tripId/feedback/:feedbackId',
  singleSession,
  authenticate,
  isAdmin,
  removeFeedback
);
tripsRouter.post('/trips',
  authenticate,
  isAdminOrManager,
  singleSession,
  createTrip
);
tripsRouter.put('/trips/:id',
  authenticate,
  isAdminOrManager,
  singleSession,
  updateTrip
);
tripsRouter.delete('/trips/:id',
  authenticate,
  isAdminOrManager,
  singleSession,
  deleteTrip
);

export default tripsRouter;
