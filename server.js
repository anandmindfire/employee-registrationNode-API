import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUiOptions  from "swagger-ui-express";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/formroutes/employeeRoutes.js";
import tableRoutes from "./routes/tableRoutes/empTable.js";
import authRoutes from "./routes/auth/authRoutes.js";
import protectedRoutes from"./routes/protectedRoutes.js";

import cors from "cors";
// add log 

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1", employeeRoutes);
app.use("/api/v1/table",tableRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/protected",protectedRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to employee-API</h1>");
});

// swagger documentation configuration
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/formroutes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  SwaggerUiOptions.serve,
  SwaggerUiOptions.setup(specs)
);


//PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
