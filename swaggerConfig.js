// swaggerConfig.js

export const swaggerOptions = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Your API Title",
        version: "1.0.0",
        description: "API documentation using Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        
      },
      servers: [
        {
          url: "http://localhost:5000", 
          description: "Development server",
        },
      ],
    },
    apis: [
      "./routes/auth/authRoutes.js",
      "./routes/formroutes/employeeRoutes.js",
      "./routes/tableRoutes/empTable.js",
    ],
  };
  
  
  