import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./src/routes/routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/api", routes);

const db = process.env.DATABASE_URL;
const PORT = process.env.PORT;

mongoose
    .connect(db)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });
