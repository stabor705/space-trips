import http from 'http';
import mongoose from "mongoose";
import 'dotenv/config'
import {app} from "./app.js";

const {PORT, MONGO_USER, MONGO_PASS} = process.env;

const server = http.createServer(app);

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@trips.3xwq4cs.mongodb.net/?retryWrites=true&w=majority`;

async function startServer() {
  await mongoose.connect(MONGO_URL);
  console.info(`Connection with Mongo database established 🚀`)
  server.listen(PORT, () => {
    console.info(`Trips API is listening on port ${PORT} 🚀`)
  });
}

startServer()
