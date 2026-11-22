// 只负责引入并启动, 非常干净，只用来监听端口
import app from './app'; // ★ 引入刚才装配好的 app ★

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  console.log(`Swagger JSON available at http://localhost:${PORT}/api-docs.json`);
});

// PM2优雅退出：收到 SIGTERM 时关闭服务器
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});