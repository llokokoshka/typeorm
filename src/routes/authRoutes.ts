import { registration, login } from "../controllers/crudControllers";
import { Router } from 'express';
import { validate } from "../middleware/validate";
import userSchema from "../schemas/fullUserSchema";

const router = Router();

router.post("/sign-up", validate(userSchema), registration);
router.post("/sign-in", login);

module.exports = router;