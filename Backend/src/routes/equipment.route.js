import { Router } from "express";
import {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment,
    scrapEquipment,
    getEquipmentRequests,
} from "../controllers/equipment.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// All routes are protected
router.use(verifyJWT);

// Read routes - all authenticated users can view
router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);
router.get("/:id/requests", getEquipmentRequests);

// Write routes - MANAGER only
router.post("/", authorizeRoles("MANAGER"), createEquipment);
router.put("/:id", authorizeRoles("MANAGER"), updateEquipment);
router.delete("/:id", authorizeRoles("MANAGER"), deleteEquipment);

// Scrap equipment - MANAGER only
router.patch("/:id/scrap", authorizeRoles("MANAGER"), scrapEquipment);

export default router;
