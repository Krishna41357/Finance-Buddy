import express from 'express'
const router = express.Router();
import { getContent, updateContent } from '../Controllers/ContentController.js';

router.get('/', getContent);
router.put('/update', updateContent);

export default router;

