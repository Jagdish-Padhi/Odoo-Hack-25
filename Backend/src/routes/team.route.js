import { Router } from "express";
import {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    addTechnician,
    removeTechnician,
} from "../controllers/team.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// All routes are protected
router.use(verifyJWT);

// Read routes - all authenticated users can view
router.get("/", getAllTeams);
router.get("/:id", getTeamById);

// Write routes - MANAGER only
router.post("/", authorizeRoles("MANAGER"), createTeam);
router.put("/:id", authorizeRoles("MANAGER"), updateTeam);
router.delete("/:id", authorizeRoles("MANAGER"), deleteTeam);

// Technician management - MANAGER only
router.post("/:id/technicians", authorizeRoles("MANAGER"), addTechnician);
router.delete("/:id/technicians", authorizeRoles("MANAGER"), removeTechnician);

export default router;
