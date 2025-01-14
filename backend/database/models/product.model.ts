import { Schema, model } from "mongoose";
const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [10, "too short product title"],
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    imgCover: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
productSchema.post("init", (doc) => {
  if (doc.imgCover) {
    console.log(
      "imgCover URL:",
      process.env.BASEURL + "product/" + encodeURIComponent(doc.imgCover)
    );
    doc.imgCover =
      process.env.BASEURL + "product/" + encodeURIComponent(doc.imgCover);
  }
});

export const productModel = model("product", productSchema);
