# Smart Factory 3D 可视化平台

> 一个基于 Vue3 + Three.js + Express 的智慧工厂 3D 低代码可视化平台。旨在解决传统工业系统数据孤岛与 3D 场景复用率低的问题。

**[在线预览 (Demo)](https://your-demo-link.com)** | 📹 **[功能演示视频 (GIF/MP4)](链接)**

## 技术栈

- **前端**：Vue 3 (Composition API) + TypeScript + Vite + Pinia + ECharts
- **3D 引擎**：Three.js (GLTF 模型加载、射线拾取、InstancedMesh 性能优化)
- **后端**：Node.js + Express + TypeScript + WebSocket + SQLite (Drizzle ORM)
- **工程化**：pnpm Workspace (Monorepo) + GitHub Actions (CI/CD) + ESLint

##  核心亮点 

1. **3D 渲染与 UI 解耦架构**：将 Three.js 核心逻辑抽离为纯 TS 模块 (`src/three/`)，通过 Composables (`useThree`) 与 Vue 响应式系统连接，保证 3D 渲染的高内聚与低耦合。
2. **Schema 驱动的低代码设计**：基于 JSON Schema 定义 3D 场景结构 (`SceneSchema`)，实现场景的动态渲染与序列化保存，为后续拖拽式编辑器打下基础。
3. **工业数据实时联动**：后端通过 `setInterval` 模拟工业设备（电机/传感器）数据源，经由 WebSocket 实时推送至前端，利用 Pinia 驱动 3D 设备高亮、状态闪烁及 ECharts 曲线更新。
4. **性能优化**：针对工厂海量设备，采用 `InstancedMesh` 处理重复几何体，利用 Raycaster 配合设备树进行低开销的精准拾取。

##  架构与数据流

本项目采用 Monorepo 架构，前后端共享类型定义 (`shared/`)。

```text
[设备数据模拟器] (Express) 
      ↓ WebSocket
[Pinia Store] (Vue) 
      ↓ 响应式更新
[Three.js 渲染层] (Canvas)  [属性面板] / [ECharts 图表]
      ↓ 用户操作 (保存场景)
[Express API] → [SQLite / Drizzle ORM]
```


## 项目目录结构

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
│       │   └── index.ts
│       │
│       ├── stores/                 # Pinia 状态中枢
│       │   ├── scene.ts            # 场景树、Schema 状态
│       │   ├── device.ts           # 设备实时状态
│       │   └── editor.ts           # 编辑模式
│       │
│       ├── api/                    # 接口封装
│       │   ├── request.ts
│       │   ├── scene.ts            # 场景保存/加载
│       │   └── device.ts           # 设备配置
│       │
│       ├── composables/            # Vue 与 Three.js 的桥梁
│       │   ├── useThree.ts         # 渲染器/相机管理
│       │   ├── useWebSocket.ts     # 实时数据接收
│       │   └── useSceneEditor.ts   # 编辑器交互逻辑
│       │
│       ├── three/                  # Three.js 核心逻辑 (纯 TS)
│       │   ├── core/               # 场景、渲染器、相机、拾取
│       │   │   ├── SceneManager.ts
│       │   │   ├── Renderer.ts
│       │   │   ├── CameraController.ts
│       │   │   └── Raycaster.ts
│       │   ├── loaders/
│       │   │   └── ModelLoader.ts
│       │   ├── objects/
│       │   │   ├── DeviceObject.ts
│       │   │   └── HighlightManager.ts
│       │   ├── schema/             # 低代码/架构思维落点
│       │   │   ├── SceneSchema.ts
│       │   │   └── SchemaRenderer.ts
│       │   └── utils/
│       │       └── performance.ts
│       │
│       ├── views/                  # 页面视图
│       │   ├── EditorView.vue
│       │   ├── DashboardView.vue
│       │   └── DeviceConfigView.vue
│       │
│       ├── components/             # 业务组件
│       │   ├── layout/
│       │   ├── scene/
│       │   ├── device/
│       │   └── charts/
│       │
│       ├── assets/
│       └── types/
│           └── index.ts            # 前端全局类型
│
├── server/                         # [后端] Express API
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   │
│   └── src/
│       ├── index.ts                # 启动 HTTP + WS
│       ├── app.ts                  # Express 实例
│       ├── routes/                 # 路由定义
│       ├── controllers/            # 控制器
│       ├── services/
│       │   ├── sceneService.ts
│       │   └── deviceSimulator.ts  # 模拟设备数据源
│       ├── models/
│       ├── middleware/
│       ├── ws/
│       │   └── deviceStream.ts     # WebSocket 推送
│       ├── utils/
│       └── types/
│
├── shared/                         # [共享] 类型定义
│   └── types/
│       ├── scene.ts                # SceneSchema
│       └── device.ts               # DeviceStatus
│
└── docs/                           # 文档说明
    ├── architecture.md
    └── api.md
```

## 本地运行指南

### 前提条件
 **Node.js >= 24**
 
 **pnpm >= 12**

### 1. 克隆项目并安装依赖
```bash
git clone https://github.com/kevenchenb/Smart-factory-3d.git
cd smart-factory-3d
pnpm install
```

### 2. 启动后端 (Express)

```bash
// 开发环境
cd server
pnpm run dev

// 生产环境 使用pm2进程守护
git pull                 # 1. 拉取最新代码
npm install              # 2. 安装依赖
npm run build            # 3. 编译 TypeScript 到 dist 目录
pm2 reload ecosystem.config.cjs  # 4. 平滑重启服务（不中断用户请求）
# 服务运行在 http://localhost:3000
```

### 3. 启动前端 (Vue3)

```bash
cd client
pnpm run dev
# 访问 http://localhost:5173
```

##  待完善功能 (Roadmap)

💡 面试时，如何把这个点变成你的加分项？
如果面试官问你：“你的后端在正式环境是怎么跑的？”
不要只干巴巴地说“我用了 PM2”。 你可以这样分层回答，直接秒杀普通候选人：

“在我目前的个人项目中，我是部署在云服务器上的，所以正式环境我采用的是 Nginx + PM2 + PM2 的 Cluster 集群模式，保证利用服务器的多核性能，同时配置了优雅退出（SIGTERM）和日志切分。如果未来公司的业务量级上升，或者基础设施全面上云，这套架构也很容易迁移到 Docker 容器化部署，届时进程守护就可以直接交给 K8s 的 Pod 健康检查来接管了。我的理解是：PM2 是为了解决单机多核和进程存活，而 K8s 是为了解决分布式集群的编排，看公司的实际基建情况选择就行。”

🚀 你接下来的正式环境实战路径
当你准备把这个项目真正上线时，你会经历以下标准的“正式环境”链路，这也是你简历上极好的素材：

服务器准备：买一台云服务器（装 Ubuntu/CentOS）。

装环境：安装 Node.js、pnpm、Nginx、PM2。

拉代码：用 Git 把代码拉到服务器上，在 server 目录下执行 pnpm install 和 pnpm build。

启动后端：执行 pm2 start ecosystem.config.cjs。

配置 Nginx：

把 client/dist 的静态文件交给 Nginx 托管。

把 http://你的域名/api 的请求反向代理到 http://127.0.0.1:3000（也就是你的 PM2 服务）。

配置 HTTPS：用 Certbot 申请 Let's Encrypt 免费证书。

把这套流程跑通一次，你就在真实意义上掌握了全栈项目的生产环境部署。对于想拿 22k 的你来说，“会写 API” 是及格线，“懂 API 怎么在正式环境稳定运行” 才是拿高薪的筹码。 PM2 就是这中间最稳固的桥梁。


“在生产环境，我使用 PM2 的集群模式来守护进程。代码更新时，我遵循‘构建-重载’的流程。关键在于，我使用 pm2 reload 而不是 restart。reload 会逐个替换工作进程，确保新进程就绪后才关闭旧进程，实现了零停机部署，用户完全无感知。同时，我会确保 PM2 配置文件中的 watch 选项在生产环境是关闭的，防止构建过程触发意外重启。这套流程也已经集成到了我的 CI/CD 流水线中，实现了自动化。”