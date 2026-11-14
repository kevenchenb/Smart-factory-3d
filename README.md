## 📁 项目目录结构

```text
smart-factory-3d/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD 流水线配置
├── .gitignore
├── README.md                       # 项目门面：架构说明、演示地址
├── package.json                    # 根 package，定义统一脚本
├── pnpm-workspace.yaml             # Monorepo 工作区配置
│
├── client/                         # [前端] Vue3 + Three.js
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── public/
│   │   └── models/                 # 静态 GLB/GLTF 工业设备模型
│   │
│   └── src/
│       ├── main.ts
│       ├── App.vue
│       ├── router/                 # 路由配置
│       ├── stores/                 # Pinia 状态中枢
│       ├── api/                    # 接口封装
│       ├── composables/            # Vue 与 Three.js 的桥梁
│       ├── three/                  # ★ Three.js 核心逻辑 (纯 TS)
│       ├── views/                  # 页面视图
│       ├── components/             # 业务组件
│       └── types/                  # 前端全局类型
│
├── server/                         # [后端] Express API
│   ├── package.json
│   ├── tsconfig.json
│   │
│   └── src/
│       ├── index.ts                # 启动 HTTP + WS
│       ├── app.ts                  # Express 实例
│       ├── routes/                 # 路由定义
│       ├── controllers/            # 控制器
│       ├── services/               # 核心业务逻辑 (如数据模拟器)
│       ├── ws/                     # WebSocket 推送
│       └── types/
│
├── shared/                         # [共享] 前后端共享类型定义
│   └── types/
│       ├── scene.ts                # SceneSchema
│       └── device.ts               # DeviceStatus
│
└── docs/                           # 文档说明
    ├── architecture.md
    └── api.md
```
