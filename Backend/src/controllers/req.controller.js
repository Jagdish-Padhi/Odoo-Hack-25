import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Request } from "../models/request.model.js";

export const getAllRequests = asyncHandler(
    async (req, res, next) => {

        // filter as per query params
        const filter = {};

        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }
        if (req.query.assignedTo) {
            filter.assignedTo = req.query.assignedTo;
        }

        // fetch req from db 
        const requests = await Request.find(filter)
            .populate("requestedBy", "fullName email")
            .populate("assignedTo", "fullName email")
            .sort({ createdAt: -1 });

        return res.status(200).json(new ApiResponse(200, requests, "Requests fetched successfully!"));
    }
);


export const getRequestById = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const request = await Request.findById(id)
            .populate("requestedBy", "fullName email")
            .populate("assignedTo", "fullName email");

        if (!request) {
            throw new ApiError(404, "Request not found");
        }

        return res.status(200).json(new ApiResponse(200, request, "Request fetched successfully!"));

    }
);


export const createRequest = asyncHandler(
    async (req, res, next) => {
        
        const { title, description, priority } = req.body;

        if(!title || !description){
            throw new ApiError(400, "Title and descriptions are required");
        }

        const request = await Request.create({
            title, 
            description,
            priority: priority || "MEDIUM", 
            requestedBy: req.user._id,
        });

        const populatedRequest = await Request.findById(request._id)
        .populate("requestedBy", "fullName email");

        return res.status(201).json(new ApiResponse(201, populatedRequest, "Request created successfully!"));
    }
);