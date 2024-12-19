import { connect, Schema, model } from "mongoose";
import env from "dotenv";
env.config();

connect(process.env.MONGO_URI);

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 3,
      required: true,
      get: function (val) {
        return Math.round(val);
      },
      set: function (val) {
        return Math.round(val);
      },
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);
export default Book;
