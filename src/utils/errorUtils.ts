import { Response } from "express";

export function handleError(res: Response, err: any, message: string) {
  console.error(err);
  res.status(500).send(message);
}
