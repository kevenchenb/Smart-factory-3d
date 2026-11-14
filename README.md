smart-factory-3d/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions：lint → build → deploy（前后端分开 job）
├── .gitignore
├── README.md                       # 项目门面：截图/GIF、架构说明、在线演示地址、本地启动指南
├── package.json                    # 根 package，定义 workspace 脚本（pnpm workspace）
├── pnpm-workspace.yaml
│
├── client/                         # ────────── 前端应用（Vue3 + Three.js）──────────
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   ├── public/
│   │   └── models/                 # 静态 GLB/GLTF 工业设备模型（如电机、机械臂、产线）
│   │
│   └── src/
│       ├── main.ts
│       ├── App.vue
│       ├── router/
│       │   └── index.ts
│       │
│       ├── stores/                 # Pinia：状态中枢，与 3D 渲染层解耦
│       │   ├── scene.ts            # 场景树、当前选中对象、Schema 状态
│       │   ├── device.ts           # 设备列表、实时状态（温度/转速/告警）
│       │   └── editor.ts           # 编辑模式、撤销重做栈
│       │
│       ├── api/                    # 接口封装（axios / fetch）
│       │   ├── request.ts
│       │   ├── scene.ts            # 场景保存/加载/列表
│       │   └── device.ts           # 设备配置 CRUD
│       │
│       ├── composables/            # 组合式函数：连接 Vue 与 Three.js
│       │   ├── useThree.ts         # 初始化 renderer/scene/camera，管理 requestAnimationFrame
│       │   ├── useWebSocket.ts     # 连接后端 WS，接收设备实时数据
│       │   └── useSceneEditor.ts   # 选中、拖拽、变换、保存的编辑逻辑
│       │
│       ├── three/                  # ★ Three.js 核心层（纯 TS，不依赖 Vue 组件）
│       │   ├── core/
│       │   │   ├── SceneManager.ts      # 场景生命周期管理
│       │   │   ├── Renderer.ts          # WebGLRenderer 封装、resize、性能监控
│       │   │   ├── CameraController.ts  # OrbitControls / 相机飞行
│       │   │   └── Raycaster.ts         # 射线拾取、设备选中
│       │   ├── loaders/
│       │   │   └── ModelLoader.ts       # GLTFLoader 封装、加载进度、缓存
│       │   ├── objects/
│       │   │   ├── DeviceObject.ts      # 设备对象封装（绑定设备 ID、状态）
│       │   │   └── HighlightManager.ts  # 设备高亮、告警闪烁（参考 three-stage 思路）
│       │   ├── schema/                  # ★ 低代码/架构思维的落点
│       │   │   ├── SceneSchema.ts       # 定义场景 JSON Schema 类型
│       │   │   └── SchemaRenderer.ts    # 根据 Schema 动态构建/更新场景
│       │   └── utils/
│       │       └── performance.ts       # InstancedMesh、LOD、帧率统计工具
│       │
│       ├── views/
│       │   ├── EditorView.vue       # 主页面：左侧场景树 + 中间 3D 画布 + 右侧属性面板
│       │   ├── DashboardView.vue    # 大屏看板：3D 场景 + 实时数据图表
│       │   └── DeviceConfigView.vue # 设备告警规则配置（低代码表单）
│       │
│       ├── components/
│       │   ├── layout/
│       │   │   ├── AppHeader.vue
│       │   │   └── AppSidebar.vue
│       │   ├── scene/
│       │   │   ├── SceneCanvas.vue      # 承载 Three.js 的 <canvas> 容器
│       │   │   ├── SceneTree.vue        # 场景树：列出设备，点击选中
│       │   │   └── PropertyPanel.vue    # 属性面板：位置/旋转/缩放/设备属性
│       │   ├── device/
│       │   │   ├── DeviceList.vue
│       │   │   └── DeviceStatusCard.vue
│       │   └── charts/
│       │       └── RealtimeChart.vue    # ECharts 封装：温度/转速曲线
│       │
│       ├── assets/
│       │   └── styles/
│       └── types/
│           └── index.ts              # 前端全局类型（SceneNode、DeviceStatus 等）
│
├── server/                         # ────────── 后端应用（Express）──────────
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   │
│   └── src/
│       ├── index.ts                 # 入口：启动 HTTP + WebSocket
│       ├── app.ts                   # Express 实例、中间件注册
│       ├── routes/
│       │   ├── index.ts
│       │   ├── scene.ts             # GET/POST/PUT/DELETE /api/scenes
│       │   └── device.ts            # GET/PUT /api/devices
│       ├── controllers/
│       │   ├── sceneController.ts
│       │   └── deviceController.ts
│       ├── services/
│       │   ├── sceneService.ts      # 场景 JSON 的存取逻辑
│       │   └── deviceSimulator.ts   # ★ 模拟设备数据源（setInterval 生成温度/转速/告警）
│       ├── models/
│       │   └── Scene.ts             # 数据模型（SQLite / MongoDB 均可，保持简单）
│       ├── middleware/
│       │   ├── errorHandler.ts
│       │   └── cors.ts
│       ├── ws/
│       │   └── deviceStream.ts      # WebSocket：把模拟数据推送给前端
│       ├── utils/
│       │   └── db.ts                # SQLite 连接 / 初始化
│       └── types/
│           └── index.ts
│
├── shared/                         # ────────── 前后端共享类型（可选但推荐）──────────
│   └── types/
│       ├── scene.ts                 # SceneSchema、SceneNode
│       └── device.ts                # DeviceStatus、DeviceConfig
│
└── docs/
    ├── architecture.md             # 架构图：数据流（设备模拟 → WS → Pinia → Three.js）
    └── api.md                      # 接口文档