import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Smart Factory 3D API',
      version: '1.0.0',
      description: '智慧工厂 3D 可视化平台后端接口文档',
    },
  },
  // 告诉 Swagger 去扫描 routes 和 controllers 里的注释
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], 
};

export const swaggerSpec = swaggerJSDoc(options);