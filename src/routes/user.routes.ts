import { Router } from "express";
import { updateUserProfile } from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();

// Route to update user profile (requires authentication)
router.put("/users/:userId/profile", authenticateJWT, updateUserProfile);

export default router;
