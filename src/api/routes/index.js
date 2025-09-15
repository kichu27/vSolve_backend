import { Router } from 'express';
import leads from './leadRoutes.js';

const router = Router();

router.use('/accesscontrollist' , leads)

export default router;
