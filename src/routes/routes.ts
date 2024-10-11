import { registrate, login, deleteUser, updateUser, getUser } from "../controllers/appControllers";
const { Router } = require('express')
const router = Router();
import authenticateToken from "../middleware/authToken";

router.post("/registrate", registrate);
router.post("/login", login);
router.get("/user/:id", authenticateToken, getUser);
router.put("/user/:id", authenticateToken, updateUser);
router.delete("/user/:id", authenticateToken, deleteUser);

module.exports = router;