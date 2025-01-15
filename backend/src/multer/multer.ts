import multer, { FileFilterCallback } from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError";

// Define types for the parameters
type FileField = {
  name: string;
  maxCount: number;
};

function refactorMulter(folderName: string) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      // Create unique name 
      cb(null, uuidv4() + " - " + file.originalname);
    },
  });
  // image only 
  // Specify types for the fileFilter function
  function fileFilter(
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("Images only", 401) as any, false);
    }
  }

  return multer({ storage, fileFilter });
}

export const uploadSingleFile = (fieldName: string, folderName: string) =>
  refactorMulter(folderName).single(fieldName);

export const uploadMixFiles = (arrOFfields: FileField[], folderName: string) =>
  refactorMulter(folderName).fields(arrOFfields);
