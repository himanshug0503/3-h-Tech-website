import { Router } from "express";
import { getHomeContent, getProjectsContent } from "../controllers/contentController.js";

const router = Router();

router.get("/home", getHomeContent);
router.get("/projects", getProjectsContent);

export default router;
