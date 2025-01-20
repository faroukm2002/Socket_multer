// import * as multer from "multer";

// declare global {
//   namespace Express {
//     interface Request {
//       file?: Express.Multer.File;
//     }
//   }
// }


import * as multer from "multer";

declare global {
  namespace Express {
    interface Request {
      files?:
        | { [fieldname: string]: Express.Multer.File[] }
        | Express.Multer.File[];
    }
  }
}
