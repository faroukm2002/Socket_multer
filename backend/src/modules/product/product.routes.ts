import express from "express";
import * as product from "./product.controller";
import { uploadMixFiles } from "../../multer/multer"; 

const productRouter = express.Router();

// Define fields for the uploadMixFiles
const uploadFields = [
  { name: "imgCover", maxCount: 1 }, 
  { name: "images", maxCount: 20 }, 
];


// if sigle image >>>>>>>>>>> uploadSingleFile("imgCover", "product"),

productRouter.route("/").get(product.getAllProduct).post(
  uploadMixFiles(uploadFields, "product"), 
  product.addProduct
);

productRouter
  .route("/:id")
  .get(product.getProductByID)
  .put(product.updateProduct)
  .delete(product.deleteProduct);

export default productRouter;
