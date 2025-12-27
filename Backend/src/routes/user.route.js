import { Router } from "express";
import {
    getCurrentUser,
    updateAccountDetails,
    changePassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All user routes are protected
router.use(verifyJWT);

router.get("/me", getCurrentUser);
router.patch("/update", updateAccountDetails);
router.post("/change-password", changePassword);

export default router;