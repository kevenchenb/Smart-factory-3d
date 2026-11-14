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
git clone https://github.com/your-username/smart-factory-3d.git
cd smart-factory-3d
pnpm install
```

### 2. 启动后端 (Express)

```bash
cd server
pnpm run dev
# 服务运行在 http://localhost:3000
```

### 3. 启动前端 (Vue3)

```bash
cd client
pnpm run dev
# 访问 http://localhost:5173
```

##  待完善功能 (Roadmap)