import { registration, login } from "../controllers/authControllers";
import { Router } from 'express';
import { validate } from "../middleware/validate";
import registrationUserSchema from "../schemas/registrationUserSchema";

const authRoutes = Router();

authRoutes.post("/sign-up", validate(registrationUserSchema), registration);
authRoutes.post("/sign-in", login);

export default authRoutes;