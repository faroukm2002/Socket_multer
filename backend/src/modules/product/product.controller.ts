import { AppError } from "./../../utils/AppError";
import { productModel } from "../../../database/models/product.model";
import { catchError } from "./../../utils/catchError";
import { NextFunction, Request, Response } from "express";
const addProduct = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    //*****/ if single image
    
    // if (req.file) {
    //   req.body.imgCover = req.file.filename;
    // }
       if (req.files) {
         const files = req.files as {
           [fieldname: string]: Express.Multer.File[];
         };
         if (files["imgCover"]) {
           req.body.imgCover = files["imgCover"][0].filename;
         }
         if (files["images"]) {
           req.body.images = files["images"].map((file) => file.filename);
         }
       }
    const { title } = req.body;
    const existProduct = await productModel.findOne({ title });
    if (existProduct) {
      return next(new AppError("Product title already exists", 400));
    }
    const Product = new productModel(req.body);
    await Product.save();
    res.status(201).json({ message: "success", Product });
  }
);

const getAllProduct = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const Product = await productModel.find();
    res.status(201).json({ message: "success", Product });
  }
);

const getProductByID = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const Product = await productModel.findById(req.params.id);
    res.status(201).json({ message: "success", Product });
  }
);

const updateProduct = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const Product = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // created

    // !Product && res.status(404).json({message:"Product not found",})
    !Product && next(new AppError("Product not found", 404));

    Product && res.status(201).json({ message: "success", Product });
  }
);

const deleteProduct = catchError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // محاولة حذف المنتج باستخدام الـ ID
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return next(new AppError("Product not found", 404));
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  }
);

export {
  addProduct,
  getAllProduct,
  getProductByID,
  updateProduct,
  deleteProduct,
};
