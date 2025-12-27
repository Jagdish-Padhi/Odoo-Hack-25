import { Router } from "express";
import {
    getAllRequests,
    getRequestById,
    createRequest,
    updateRequest,
    deleteRequest,
    updateStatus,
    getRequestsByStatus,
    getPreventiveRequests,
} from "../controllers/req.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// All routes are protected
router.use(verifyJWT);

// Special routes (put before /:id to avoid conflicts) - all can view
router.get("/kanban", getRequestsByStatus);
router.get("/preventive", getPreventiveRequests);

// Read routes - all authenticated users can view
router.get("/", getAllRequests);
router.get("/:id", getRequestById);

// Create request - all users can create (report issues)
router.post("/", createRequest);

// Update/Delete request - MANAGER only
router.put("/:id", authorizeRoles("MANAGER"), updateRequest);
router.delete("/:id", authorizeRoles("MANAGER"), deleteRequest);

// Status update (for Kanban drag-drop) - MANAGER and TECHNICIAN
router.patch("/:id/status", authorizeRoles("MANAGER", "TECHNICIAN"), updateStatus);

export default router;
