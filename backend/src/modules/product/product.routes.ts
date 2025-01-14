import express  from "express"
    import  * as product  from "./product.controller"
import { uploadSingleFile } from "../../multer/multer";
const productRouter =express.Router()



productRouter
  .route("/")
  .get(product.getAllProduct) 
  .post(
    uploadSingleFile("imgCover", "product"), 
    product.addProduct
  );

  productRouter
    .route("/:id")
    .get(product.getProductByID)
    .put(product.updateProduct)
    .delete(product.deleteProduct);

export default productRouter;


