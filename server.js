import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiOptions from "swagger-ui-express";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/formroutes/employeeRoutes.js";
import tableRoutes from "./routes/tableRoutes/empTable.js";
import authRoutes from "./routes/auth/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import cors from "cors";
import {swaggerOptions} from"./swaggerConfig.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", employeeRoutes);
app.use("/api/v1/table", tableRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/protected", protectedRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to employee-API</h1>");
});

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api/v1-docs", SwaggerUiOptions.serve, SwaggerUiOptions.setup(specs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
