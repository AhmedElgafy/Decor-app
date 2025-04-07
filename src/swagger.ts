// src/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI 3.0 Specification
    info: {
      title: "Decor API",
      version: "1.0.0",
      description: "API documentation for the Decor app",
    },
    servers: [
      {
        url: "http://localhost:3001", // Change to your production URL
      },
    ],
  },
  apis: ["./src/v1/routes/*.ts", "./src/v1/controllers/*.ts"], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
