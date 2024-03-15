const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Calls = sequelize.define('Calls', {
    call_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
}, {
    tableName: 'calls', // Ensure this matches your actual table name in the database
    timestamps: false, // If you don't want Sequelize to automatically manage createdAt and updatedAt fields
});

// Function to reset call_count to zero
const resetCallCount = async () => {
    try {
        // Update call_count column to zero
        await Calls.update({ call_count: 0 }, { where: {} });
        console.log('Call count reset successfully at midnight.');
    } catch (error) {
        console.error('Error resetting call count:', error);
    }
};

// Function to calculate the time until the next midnight
const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Next day
        0,   // Hour
        0,   // Minute
        0    // Second
    );
    const timeUntilMidnight = midnight.getTime() - now.getTime();
    return timeUntilMidnight;
};

// Function to perform the reset operation at midnight
const performResetAtMidnight = async () => {
    // Get the time until the next midnight
    const timeUntilMidnight = getTimeUntilMidnight();

    // Wait until midnight and then reset call_count
    setTimeout(async () => {
        await resetCallCount();
        // Schedule the next reset operation recursively
        performResetAtMidnight();
    }, timeUntilMidnight);
};

// Start the reset operation
performResetAtMidnight();

module.exports = Calls;
