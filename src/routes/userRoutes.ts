import { deleteUser, updateUser, getUser } from "../controllers/crudControllers";
const { Router } = require('express')
const router = Router();
import authenticateToken from "../middleware/authToken";
import { validate } from "../middleware/validate";
import userSchema from "../schemas/userSchema";

router.get("/user/:id", authenticateToken, getUser);
router.put("/user/:id", validate(userSchema), authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken, deleteUser);

module.exports = router;