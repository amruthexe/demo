import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectWithRetry(retries: number = 5, delay: number = 3000): Promise<void> {
  try {
    // Use the connection options directly in `mongoose.connect()`
    await mongoose.connect(MONGODB_URI!, {
      bufferCommands: true,
      maxPoolSize: 20, // Increased for production
      serverSelectionTimeoutMS: 60000, // Increased to 60 seconds
      connectTimeoutMS: 60000, // Increased to 60 seconds
      heartbeatFrequencyMS: 5000, // More frequent heartbeats
      retryWrites: true,
      retryReads: true,
      family: 4,
      socketTimeoutMS: 60000, // Increased socket timeout
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(`MongoDB connection attempt failed (${retries} retries left):`, err);
    if (retries === 0) {
      throw new Error("Failed to connect to MongoDB after multiple retries");
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    await connectWithRetry(retries - 1, delay);
  }
}

export async function connectToDatabase() {
  if (cached.conn) {
    // Check if the connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    }
    // If connection is not alive, clear the cache
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = connectWithRetry().then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
