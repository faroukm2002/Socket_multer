import { Schema, model, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  price: number;
  imgCover?: string;
  images?: string[]; 
}

const productSchema = new Schema<IProduct>(
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
    images: {
      type: [String], 
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.post("init", (doc) => {
  if (doc.imgCover) {
    const encodedImage = encodeURIComponent(doc.imgCover);
    doc.imgCover = `${process.env.BASEURL}/product/${encodedImage}`;
  }
  if (doc.images && doc.images.length > 0) {
    doc.images = doc.images.map(
      (img) => `${process.env.BASEURL}/product/${encodeURIComponent(img)}`
    );
  }
});

export const productModel = model<IProduct>("product", productSchema);
