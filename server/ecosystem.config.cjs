module.exports = {
    apps: [
      {
        name: 'smart-factory-api',       // 进程名称
        script: './dist/index.js',        // ★ 指向编译后的JS文件
        instances: 1,                     // 进程实例数（求职作品设为1即可）
        autorestart: true,                // 崩溃自动重启
        watch: false,                     // 生产环境关闭文件监听
        max_memory_restart: '500M',       // 内存超限自动重启
        env: {
          NODE_ENV: 'production',
          PORT: 3000
        },
        error_file: './logs/err.log',     // 错误日志路径
        out_file: './logs/out.log',       // 标准输出日志路径
        log_date_format: 'YYYY-MM-DD HH:mm:ss' // 日志时间格式
      }
    ]
  };