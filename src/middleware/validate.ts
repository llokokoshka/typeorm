import { NextFunction, Request, Response } from "express";

export const validate = (schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      // query: req.query,
      // params: req.params,
    }, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};

