import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Film adı daxil edilməlidir"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Təsvir daxil edilməlidir"],
    },
    poster: {
      type: String,
      required: [true, "Poster şəkli lazımdır"],
    },
    genre: [
      {
        type: String,
      },
    ],
    year: {
      type: Number,
      required: [true, "İl daxil edilməlidir"],
    },
    director: {
      type: String,
      required: [true, "Rejissor adı daxil edilməlidir"],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    duration: {
      type: Number,
    },
        trailerUrl: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;