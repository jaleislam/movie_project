import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB qoşuldu: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB xətası: ${error.message}`);
    process.exit(1); // server-i dayandır, çünki DB olmadan işləmək mənasızdır
  }
};

export default connectDB;