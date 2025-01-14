import { NextFunction, Request, Response } from "express";
export const globalError = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err.message
    let code=err.statusCode || 500
    process.env.MODE == "development"?
     res.status(code).json({error,stack:err.stack})
    : res.status(code).json({error})

   
}      