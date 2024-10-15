import { deleteUser, updateUser, getUser, getAllUsers } from "../controllers/crudControllers";
const { Router } = require('express')
const router = Router();
import authenticateToken from "../middleware/authToken";
import { validate } from "../middleware/validate";
import updateUserSchema from "../schemas/updateUserSchema";

router.get("/users", authenticateToken, getAllUsers);
router.get("/user/:id", authenticateToken, getUser);
router.patch("/user/:id", validate(updateUserSchema), authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken, deleteUser);

module.exports = router;