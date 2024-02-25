import {tripFind} from "../../models/trip/trip.model.js";

let socket;
let query;

export async function socketConnectionRequest(request, response) {
  socket = response;
  query = request.query;
  response.setHeader('Cache-Control', 'no-cache');
  response.setHeader('Content-Type', 'text/event-stream');
  response.setHeader('Connection', 'keep-alive');
  response.flushHeaders();
  const trips = await tripFind(query);

  socket.write(`id: ${Date.now()}\ndata: ${JSON.stringify({trips: trips})}\n\n`);

  // If client closes connection, stop sending events
  response.on('close', () => {
    console.log('socket connection closed')
    response.end();
  });

}

export async function publishTrips() {
  const trips = await tripFind(query);
  socket.write(`id: ${Date.now()}\ndata: ${JSON.stringify({trips: trips})}\n\n`);
}
