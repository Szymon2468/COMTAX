import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let conn;

async function dbConnect() {
  if (!conn || !conn.connection || !conn.connection.host) {
    conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }

  console.log(`MongoDB already connected: ${conn.connection.host}`);
}

export default dbConnect;
