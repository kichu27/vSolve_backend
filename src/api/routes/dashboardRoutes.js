import { Router } from "express";
import {getLeadRequestsByType } from "../controllers/dashboardController/index.js";

const router = Router();

router.post("/getLeadRequestsByType", getLeadRequestsByType);



  
export default router;