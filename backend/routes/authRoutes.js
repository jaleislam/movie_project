import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../middleware/validators.js";
import validateRequest from "../middleware/validateRequest.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;