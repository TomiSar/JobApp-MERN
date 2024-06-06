import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `MongoDB successfully connected to cluster ${conn.connection.host}`
        .rainbow
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
