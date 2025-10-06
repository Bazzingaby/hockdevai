import { Router } from 'express';
import { fetchKnowledge, reinforce, updateTask } from '../controllers/knowledgeController.js';
import { finishOAuth, startOAuth, verifyApiKey } from '../controllers/authController.js';

const router = Router();

router.get('/knowledge', fetchKnowledge);
router.post('/knowledge/task', updateTask);
router.post('/knowledge/reinforce', reinforce);

router.get('/auth/:provider/start', startOAuth);
router.post('/auth/:provider/finish', finishOAuth);
router.post('/auth/:provider/token', verifyApiKey);

export default router;
