import { KnowledgeBase, updateKnowledgeBase } from './knowledgebaseService.js';

type RewardSignal = {
  metric: 'quality' | 'speed' | 'learning';
  value: number; // -1 to 1
  note: string;
};

type PolicyUpdate = {
  enabled: boolean;
  notes: string;
};

export function calculateRewardSummary(signals: RewardSignal[]): number {
  if (!signals.length) return 0;
  return signals.reduce((total, signal) => total + signal.value, 0) / signals.length;
}

export async function reinforceKnowledgeBase(
  knowledge: KnowledgeBase,
  signals: RewardSignal[],
  policyUpdate?: PolicyUpdate
) {
  const summary = calculateRewardSummary(signals);
  const timestamp = new Date().toISOString();

  const notes = [
    `Last reward summary: ${summary.toFixed(2)}`,
    ...signals.map((signal) => `${signal.metric}: ${signal.value} (${signal.note})`)
  ];

  if (policyUpdate?.notes) {
    notes.push(`Policy update: ${policyUpdate.notes}`);
  }

  return updateKnowledgeBase({
    reinforcement: {
      enabled: policyUpdate?.enabled ?? knowledge.reinforcement.enabled,
      lastUpdate: timestamp,
      policyNotes: notes.join('\n')
    }
  });
}

export type { RewardSignal, PolicyUpdate };
