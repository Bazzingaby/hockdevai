import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export type KnowledgeTask = {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  owner: string;
  notes: string;
};

export type ReinforcementState = {
  enabled: boolean;
  lastUpdate: string | null;
  policyNotes: string;
};

export type KnowledgeBase = {
  projectName: string;
  vision: string;
  currentSprint: string;
  nextMilestone: string;
  reinforcement: ReinforcementState;
  tasks: KnowledgeTask[];
};

const knowledgePath = fileURLToPath(new URL('../data/knowledgebase.json', import.meta.url));

async function readKnowledgeBase(): Promise<KnowledgeBase> {
  const file = await readFile(knowledgePath, 'utf-8');
  return JSON.parse(file) as KnowledgeBase;
}

async function writeKnowledgeBase(knowledge: KnowledgeBase) {
  await writeFile(knowledgePath, JSON.stringify(knowledge, null, 2), 'utf-8');
}

export async function getKnowledgeBase() {
  return readKnowledgeBase();
}

export async function updateKnowledgeBase(partial: Partial<KnowledgeBase>) {
  const knowledge = await readKnowledgeBase();
  const updated = { ...knowledge, ...partial } as KnowledgeBase;
  await writeKnowledgeBase(updated);
  return updated;
}

export async function upsertTask(task: KnowledgeTask) {
  const knowledge = await readKnowledgeBase();
  const existingIndex = knowledge.tasks.findIndex((t) => t.id === task.id);
  if (existingIndex >= 0) {
    knowledge.tasks[existingIndex] = task;
  } else {
    knowledge.tasks.push(task);
  }
  await writeKnowledgeBase(knowledge);
  return task;
}
