import { deleteUser, updateUser, getUser, getAllUsers } from "../controllers/userControllers";
import { Router } from 'express';
const userRoutes = Router();
import authenticateToken from "../middleware/authToken";
import { validate } from "../middleware/validate";
import updateUserSchema from "../schemas/updateUserSchema";


userRoutes.get("/:id", authenticateToken, getUser);
userRoutes.patch("/", validate(updateUserSchema), authenticateToken, updateUser);
userRoutes.delete("/:id", authenticateToken, deleteUser);
userRoutes.get("/", authenticateToken, getAllUsers);

export default userRoutes ;