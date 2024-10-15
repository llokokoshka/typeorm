import { deleteUser, updateUser, getUser, getAllUsers } from "../controllers/crudControllers";
import { Router } from 'express';
const userRoutes = Router();
import authenticateToken from "../middleware/authToken";
import { validate } from "../middleware/validate";
import updateUserSchema from "../schemas/updateUserSchema";


userRoutes.get("/uid/:id", authenticateToken, getUser);
userRoutes.patch("/uid/:id", validate(updateUserSchema), authenticateToken, updateUser);
userRoutes.delete("/uid/:id", authenticateToken, deleteUser);
userRoutes.get("/allUsers", authenticateToken, getAllUsers);

export default userRoutes ;