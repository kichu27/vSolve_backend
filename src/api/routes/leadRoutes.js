import { Router } from "express";
import {createLeadAndAccessRequest , updatedLead} from "../controllers/leadController/index.js";

const router = Router();

router.post("/submitAccessRequestForm", createLeadAndAccessRequest);
router.post("/updateLead", updatedLead);

  
export default router;