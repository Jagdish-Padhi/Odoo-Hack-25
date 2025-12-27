import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Request } from "../models/request.model.js";
import { Equipment } from "../models/equipment.model.js";


export const getAllRequests = asyncHandler(async (req, res, next) => {
    const filter = {};

    if (req.query.status) {
        filter.status = req.query.status;
    }
    if (req.query.priority) {
        filter.priority = req.query.priority;
    }
    if (req.query.type) {
        filter.type = req.query.type;
    }
    if (req.query.assignedTeam) {
        filter.assignedTeam = req.query.assignedTeam;
    }
    if (req.query.equipment) {
        filter.equipment = req.query.equipment;
    }

    const requests = await Request.find(filter)
        .populate("equipment", "name serialNumber location")
        .populate("assignedTeam", "name")
        .populate("requestedBy", "fullName email")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, requests, "Requests fetched successfully"));
});


export const getRequestById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const request = await Request.findById(id)
        .populate("equipment", "name serialNumber location")
        .populate("assignedTeam", "name technicians")
        .populate("requestedBy", "fullName email");

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, request, "Request fetched successfully"));
});


export const createRequest = asyncHandler(async (req, res, next) => {
    const { title, description, type, priority, equipment, scheduledDate } = req.body;

    
    if (!title || !description || !type || !equipment) {
        throw new ApiError(400, "Title, description, type and equipment are required");
    }

    if (!["CORRECTIVE", "PREVENTIVE"].includes(type)) {
        throw new ApiError(400, "Type must be CORRECTIVE or PREVENTIVE");
    }

    // For PREVENTIVE, scheduledDate is required
    if (type === "PREVENTIVE" && !scheduledDate) {
        throw new ApiError(400, "Scheduled date is required for preventive maintenance");
    }

    // Get equipment and auto-assign team
    const equipmentDoc = await Equipment.findById(equipment);
    if (!equipmentDoc) {
        throw new ApiError(404, "Equipment not found");
    }

    if (equipmentDoc.status === "SCRAPPED") {
        throw new ApiError(400, "Cannot create request for scrapped equipment");
    }

    const assignedTeam = equipmentDoc.assignedTeam || null;

    const request = await Request.create({
        title,
        description,
        type,
        priority: priority || "MEDIUM",
        equipment,
        assignedTeam,
        requestedBy: req.user._id,
        scheduledDate: type === "PREVENTIVE" ? scheduledDate : null,
    });

    const populatedRequest = await Request.findById(request._id)
        .populate("equipment", "name serialNumber location")
        .populate("assignedTeam", "name")
        .populate("requestedBy", "fullName email");

    return res
        .status(201)
        .json(new ApiResponse(201, populatedRequest, "Request created successfully"));
});


export const updateRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, priority, scheduledDate } = req.body;

    const request = await Request.findById(id);

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    // Only creator or MANAGER can update
    if (request.requestedBy.toString() !== req.user._id.toString() && req.user.role !== "MANAGER") {
        throw new ApiError(403, "You are not authorized to update this request");
    }

    if (title) request.title = title;
    if (description) request.description = description;
    if (priority) request.priority = priority;
    if (scheduledDate) request.scheduledDate = scheduledDate;

    await request.save();

    const updatedRequest = await Request.findById(id)
        .populate("equipment", "name serialNumber location")
        .populate("assignedTeam", "name")
        .populate("requestedBy", "fullName email");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedRequest, "Request updated successfully"));
});


export const deleteRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    // Only creator or MANAGER can delete
    if (request.requestedBy.toString() !== req.user._id.toString() && req.user.role !== "MANAGER") {
        throw new ApiError(403, "You are not authorized to delete this request");
    }

    await Request.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Request deleted successfully"));
});


export const updateStatus = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status, duration } = req.body;

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    if (!["NEW", "IN_PROGRESS", "REPAIRED", "SCRAP"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const request = await Request.findById(id);

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    // If marking as REPAIRED, duration is required
    if (status === "REPAIRED" && !duration) {
        throw new ApiError(400, "Duration is required when marking as repaired");
    }

    request.status = status;
    if (status === "REPAIRED") {
        request.duration = duration;
    }

    await request.save();

    const updatedRequest = await Request.findById(id)
        .populate("equipment", "name serialNumber location")
        .populate("assignedTeam", "name")
        .populate("requestedBy", "fullName email");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedRequest, "Status updated successfully"));
});


export const getRequestsByStatus = asyncHandler(async (req, res, next) => {
    const statuses = ["NEW", "IN_PROGRESS", "REPAIRED", "SCRAP"];

    const result = {};

    for (const status of statuses) {
        result[status] = await Request.find({ status })
            .populate("equipment", "name serialNumber")
            .populate("assignedTeam", "name")
            .populate("requestedBy", "fullName")
            .sort({ createdAt: -1 });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, result, "Kanban data fetched successfully"));
});


export const getPreventiveRequests = asyncHandler(async (req, res, next) => {
    const { month, year } = req.query;

    const filter = { type: "PREVENTIVE" };

    // filter by month/year for calendar view
    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);
        filter.scheduledDate = { $gte: startDate, $lte: endDate };
    }

    const requests = await Request.find(filter)
        .populate("equipment", "name serialNumber")
        .populate("assignedTeam", "name")
        .sort({ scheduledDate: 1 });

    return res
        .status(200)
        .json(new ApiResponse(200, requests, "Preventive requests fetched successfully"));
});