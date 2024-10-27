import express from 'express';
import { generateCertificate } from '../controllers/certificateController.js';

const router = express.Router();

router.get('/:certificateId', generateCertificate);

export default router;