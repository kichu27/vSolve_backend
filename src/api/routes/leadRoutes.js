import { Router } from "express";
import {createLead} from "../controllers/leadController/index.js";

const router = Router();

router.post("/createLead",createLead);

export default router;