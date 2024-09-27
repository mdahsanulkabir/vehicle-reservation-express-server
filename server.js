const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const reservationRoutes = require('./routes/reservationRoutes');
const { dbConnect, dbDisconnect } = require("./services/mongoConn");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credential/credentials");
require('dotenv').config();
const PORT = process.env.PORT;
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from root.\n")
})

app.use("/reservation-api", reservationRoutes)




async function startServer() {
    try {
        await dbConnect();
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Graceful shutdown
        const shutdown = async () => {
            console.log("Shutting down server...");
            await dbDisconnect();
            server.close(() => {
                console.log("Server closed");
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Exit process with failure
    }
}

startServer();