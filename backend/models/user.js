import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ad daxil edilməlidir"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email daxil edilməlidir"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Şifrə daxil edilməlidir"],
      minlength: [6, "Şifrə ən azı 6 simvol olmalıdır"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;