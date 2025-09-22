import { Router } from "express";
import {createLeadAndAccessRequest} from "../controllers/leadController/index.js";

const router = Router();

router.post("/submitAccessRequestForm", createLeadAndAccessRequest);
  
export default router;