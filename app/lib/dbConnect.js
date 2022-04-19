import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

async function dbConnect() {
  const conn = await mongoose.connect(MONGODB_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
}

export default dbConnect;
