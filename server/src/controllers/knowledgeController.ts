import { Request, Response } from 'express';
import { getKnowledgeBase, upsertTask } from '../services/knowledgebaseService.js';
import { reinforceKnowledgeBase } from '../services/reinforcementService.js';

export async function fetchKnowledge(req: Request, res: Response) {
  const knowledge = await getKnowledgeBase();
  res.json(knowledge);
}

export async function updateTask(req: Request, res: Response) {
  const task = await upsertTask(req.body);
  res.json(task);
}

export async function reinforce(req: Request, res: Response) {
  const knowledge = await getKnowledgeBase();
  const updated = await reinforceKnowledgeBase(knowledge, req.body.signals ?? [], req.body.policyUpdate);
  res.json(updated.reinforcement);
}
