// server/src/app.ts
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger'; // 确保这个文件存在

const app = express();

// 基础中间件
app.use(cors());
app.use(express.json());

// 业务路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Factory Backend is running' });
});

// Swagger 配置
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ★ 关键：导出 app 实例 ★
export default app;