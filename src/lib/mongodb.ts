import mongoose, { Mongoose } from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}
let globalMongo = global as typeof globalThis & {
  mongo: any;
};

const uri: string = process.env.MONGODB_URI;

let cached = globalMongo.mongo;

export async function connectToDatabase() {
  if (cached) {
    return cached;
  }
  try {
    cached = await mongoose.connect(uri);

    globalMongo.mongo = cached;
    return cached;
  } catch (error) {
    console.log(error);
  }
}
