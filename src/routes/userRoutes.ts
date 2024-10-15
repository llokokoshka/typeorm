import { deleteUser, updateUser, getUser, getAllUsers } from "../controllers/crudControllers";
import { Router } from 'express';
const userRoutes = Router();
import authenticateToken from "../middleware/authToken";
import { validate } from "../middleware/validate";
import updateUserSchema from "../schemas/updateUserSchema";

userRoutes.get("/users", authenticateToken, getAllUsers);
userRoutes.get("/:id", authenticateToken, getUser);
userRoutes.patch("/:id", validate(updateUserSchema), authenticateToken, updateUser);
userRoutes.delete("/:id", authenticateToken, deleteUser);

export default userRoutes ;