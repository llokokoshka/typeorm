import { NextFunction, Request, Response } from "express";

export const validate = (schema) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validate({
      body: req.body,
    }, { abortEarly: false });
    next();
  } catch (err) {
    res.status(500).json({ type: err.name, message: err.message });
  }
};

