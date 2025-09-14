import express from "express";
import validate from "../middleware/validate";
import { loginSchema, registerSchema } from "../validation/user.validation";
import userController from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validate(registerSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.get("/me", authenticateToken, userController.getCurrentUser);

export default router;
