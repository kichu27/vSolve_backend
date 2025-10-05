import { Router } from 'express';
import leads from './leadRoutes.js';
import dashboard from './dashboardRoutes.js';
import scoreParam from "./scoreParamRoutes.js"


const router = Router();
router.use('/lead', leads);
router.use('/dashboard', dashboard);
router.use('/scoreParam', scoreParam);


export default router;
