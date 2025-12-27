import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },

        type: {
            type: String,
            enum: ["CORRECTIVE", "PREVENTIVE"],
            required: [true, "Request type is required"],
        },

        status: {
            type: String,
            enum: ["NEW", "IN_PROGRESS", "REPAIRED", "SCRAP"],
            default: "NEW",
        },

        priority: {
            type: String,
            enum: ["LOW", "MEDIUM", "HIGH"],
            default: "MEDIUM",
        },

        equipment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Equipment",
            required: [true, "Equipment is required"],
        },

        assignedTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaintenanceTeam",
            default: null,
        },

        requestedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        duration: {
            type: Number,  // in minutes
            default: null,
        },

        scheduledDate: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);