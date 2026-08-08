import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB-ye qosuldu");

    const existingAdmin = await User.findOne({ email: "jaleislam1202@gmail.com" });
    if (existingAdmin) {
      console.log("Admin artiq movcuddur");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("jale1217", 10);

    const admin = await User.create({
      name: "Jale",
      email: "jaleislam1202@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin yaradildi:");
    console.log(`Email: ${admin.email}`);
    console.log(`Sifre: jale1217`);

    process.exit(0);
  } catch (error) {
    console.error("Xeta:", error.message);
    process.exit(1);
  }
};

createAdmin();