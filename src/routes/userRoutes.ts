import { deleteUser, updateUser, getUser, getAllUsers } from "../controllers/crudControllers";
const { Router } = require('express')
const router = Router();
import authenticateToken from "../middleware/authToken";
import { validate } from "../middleware/validate";
import updateUserSchema from "../schemas/updateUserSchema";

router.get("/users", authenticateToken, getAllUsers);
router.get("/:id", authenticateToken, getUser);
router.patch("/:id", validate(updateUserSchema), authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;