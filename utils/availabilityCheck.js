// Availability Logic
// The key part of the system will be finding an available dock based on the station, containerType, and the time required for loading/unloading. Here's the approach:


// Check for Dock Availability:
// When a user requests a booking, the system will:
// Fetch all docks for the specified station.
// Iterate through the docks to check which dock has the earliest nextAvailableTime.
// Calculate the total loading/unloading time based on the container size.
// Assign the dock with the earliest availability and update the nextAvailableTime accordingly.


// Booking Flow
// The user selects a station and containerType.
// The system checks dock availability using the findAvailableDock function.
// Once an available dock is found, the Booking schema is populated, and the Dock schema is updated with the new nextAvailableTime.
// The user can then view their assigned dock and booking times, while the system ensures the dock isn't double-booked.


const DOCK = require("../models/dockModel");

const findAvailableDock = async (station, containerType) => {
    const docks = await DOCK.find({ station: station, isAvailable: true })
                            .sort({ nextAvailableTime: 1 });  // Sort by availability time

    if (docks.length === 0) {
        return null;  // No available docks
    }

    const unloadTimes = {
        '40\'': 120,
        '23\'': 60,
        '20\'': 60,
        '8\'': 5,
        '12\'': 12
    };

    const dock = docks[0];  // Assign the first available dock
    const unloadTime = unloadTimes[containerType];

    // Update dock availability
    const startTime = dock.nextAvailableTime;
    const endTime = new Date(startTime.getTime() + unloadTime * 60000);  // Add unload time in minutes

    dock.nextAvailableTime = endTime;
    await dock.save();

    return { dock, startTime, endTime };
};

module.exports = findAvailableDock;