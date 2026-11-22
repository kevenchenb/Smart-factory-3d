import { Router } from 'express';
const router = Router();

/**
 * @openapi
 * /api/scenes:
 *   get:
 *     summary: 获取所有场景列表
 *     tags: [Scene]
 *     responses:
 *       200:
 *         description: 成功返回场景数组
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   sceneJson:
 *                     type: object
 */
router.get('/', (req, res) => {
  // 业务逻辑
});

export default router;