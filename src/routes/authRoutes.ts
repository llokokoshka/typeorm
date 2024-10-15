import { registration, login } from "../controllers/crudControllers";
import { Router } from 'express';
import { validate } from "../middleware/validate";
import userSchema from "../schemas/fullUserSchema";

const router = Router();

router.post("/registration", validate(userSchema), registration);
router.post("/login", login);

module.exports = router;