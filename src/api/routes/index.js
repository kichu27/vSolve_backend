import { Router } from 'express';
import leads from './leadRoutes.js';
import dashboard from './dashboardRoutes.js';


const router = Router();
router.use('/lead', leads);
router.use('/dashboard', dashboard);



export default router;
