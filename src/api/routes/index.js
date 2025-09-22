import { Router } from 'express';
import leads from './leadRoutes.js';

const router = Router();
router.use('/lead', leads);

export default router;
