import { Router } from 'express';
import { getAllRequests } from '../controllers/req.controller.js';

const router = Router();

router.get('/requests', getAllRequests);

export default router;