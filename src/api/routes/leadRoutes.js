import { Router } from "express";
import {createLeadAndAccessRequest , updatedLead , leadAccessApprove} from "../controllers/leadController/index.js";

const router = Router();

router.post("/submitAccessRequestForm", createLeadAndAccessRequest);
router.post("/updateLead", updatedLead);
router.post("/leadAccessApprove", leadAccessApprove);

  
export default router;