import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Equipment name is required"],
            trim: true,
        },

        serialNumber: {
            type: String,
            required: [true, "Serial number is required"],
            unique: true,
            trim: true,
        },

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },

        // for auto-assignment)
        assignedTeam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MaintenanceTeam",
            default: null,
        },

        status: {
            type: String,
            enum: ["ACTIVE", "SCRAPPED"],
            default: "ACTIVE",
        },
    },
    { timestamps: true }
);

export const Equipment = mongoose.model("Equipment", equipmentSchema);