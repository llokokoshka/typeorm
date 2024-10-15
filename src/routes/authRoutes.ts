import { registration, login } from "../controllers/crudControllers";
import { Router } from 'express';
import { validate } from "../middleware/validate";
import userSchema from "../schemas/fullUserSchema";

const authRoutes = Router();

authRoutes.post("/sign-up", validate(userSchema), registration);
authRoutes.post("/sign-in", login);

export default authRoutes;