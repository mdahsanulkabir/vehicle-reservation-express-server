const mongoose = require('mongoose')
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;
const cached = {};

async function dbConnect() {
    if (!DATABASE_URL) {
        throw new Error(
            "Please define the DATABASE_URL environment variable inside .env.local"
        );
    }
    if (cached.connection) {
        return cached.connection;
    }
    if (!cached.promise) {
        const opts = {
            // bufferCommands: false,
            // dbName: "reservation"
        };
        cached.promise = mongoose.connect(DATABASE_URL, opts);
    }
    try {
        cached.connection = await cached.promise;
    } catch (e) {
        cached.promise = undefined;
        throw e;
    }
    return cached.connection;
}

async function dbDisconnect() {
    if (cached.connection) {
        await mongoose.disconnect();
        cached.connection = null;
        cached.promise = null;
    }
}

module.exports = { dbConnect, dbDisconnect }