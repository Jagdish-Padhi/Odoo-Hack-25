import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { MaintenanceTeam } from "../models/MaintenanceTeam.model.js";
import { User } from "../models/user.model.js";


export const getAllTeams = asyncHandler(async (req, res, next) => {
    const teams = await MaintenanceTeam.find()
        .populate("technicians", "fullName email role")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, teams, "Teams fetched successfully"));
});


export const getTeamById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const team = await MaintenanceTeam.findById(id)
        .populate("technicians", "fullName email role");

    if (!team) {
        throw new ApiError(404, "Team not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, team, "Team fetched successfully"));
});


export const createTeam = asyncHandler(async (req, res, next) => {
    const { name, technicians } = req.body;

    if (!name) {
        throw new ApiError(400, "Team name is required");
    }

    // if team name already exists
    const existingTeam = await MaintenanceTeam.findOne({ name });
    if (existingTeam) {
        throw new ApiError(400, "Team with this name already exists");
    }

    const team = await MaintenanceTeam.create({
        name,
        technicians: technicians || [],
    });

    const populatedTeam = await MaintenanceTeam.findById(team._id)
        .populate("technicians", "fullName email role");

    return res
        .status(201)
        .json(new ApiResponse(201, populatedTeam, "Team created successfully"));
});


export const updateTeam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    const team = await MaintenanceTeam.findById(id);

    if (!team) {
        throw new ApiError(404, "Team not found");
    }

    // name uniqueness if updating
    if (name && name !== team.name) {
        const existingTeam = await MaintenanceTeam.findOne({ name });
        if (existingTeam) {
            throw new ApiError(400, "Team with this name already exists");
        }
        team.name = name;
    }

    await team.save();

    const updatedTeam = await MaintenanceTeam.findById(id)
        .populate("technicians", "fullName email role");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTeam, "Team updated successfully"));
});


export const deleteTeam = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const team = await MaintenanceTeam.findById(id);

    if (!team) {
        throw new ApiError(404, "Team not found");
    }

    await MaintenanceTeam.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Team deleted successfully"));
});


export const addTechnician = asyncHandler(async (req, res, next) => {
    const { id } = req.params;  // team id
    const { technicianId } = req.body;

    if (!technicianId) {
        throw new ApiError(400, "Technician ID is required");
    }

    const team = await MaintenanceTeam.findById(id);
    if (!team) {
        throw new ApiError(404, "Team not found");
    }

    // Check if user exists and is a technician
    const user = await User.findById(technicianId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    if (user.role !== "TECHNICIAN") {
        throw new ApiError(400, "User must have TECHNICIAN role");
    }

    // if already in team
    if (team.technicians.includes(technicianId)) {
        throw new ApiError(400, "Technician is already in this team");
    }

    team.technicians.push(technicianId);
    await team.save();

    const updatedTeam = await MaintenanceTeam.findById(id)
        .populate("technicians", "fullName email role");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTeam, "Technician added successfully"));
});


export const removeTechnician = asyncHandler(async (req, res, next) => {
    const { id } = req.params;  // team id
    const { technicianId } = req.body;

    if (!technicianId) {
        throw new ApiError(400, "Technician ID is required");
    }

    const team = await MaintenanceTeam.findById(id);
    if (!team) {
        throw new ApiError(404, "Team not found");
    }

    // Check if technician is in team
    if (!team.technicians.includes(technicianId)) {
        throw new ApiError(400, "Technician is not in this team");
    }

    team.technicians = team.technicians.filter(
        (t) => t.toString() !== technicianId
    );
    await team.save();

    const updatedTeam = await MaintenanceTeam.findById(id)
        .populate("technicians", "fullName email role");

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTeam, "Technician removed successfully"));
});