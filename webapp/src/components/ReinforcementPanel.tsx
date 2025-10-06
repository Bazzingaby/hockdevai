import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { KnowledgeBase } from '../App';

type Props = {
  reinforcement: KnowledgeBase['reinforcement'];
};

type RewardForm = {
  quality: number;
  speed: number;
  learning: number;
  note: string;
  enableRL: boolean;
};

const initialReward: RewardForm = {
  quality: 0.5,
  speed: 0.5,
  learning: 0.5,
  note: '',
  enableRL: false
};

async function sendReinforcement(payload: RewardForm) {
  const signals = [
    { metric: 'quality', value: payload.quality, note: payload.note },
    { metric: 'speed', value: payload.speed, note: payload.note },
    { metric: 'learning', value: payload.learning, note: payload.note }
  ];

  const policyUpdate = {
    enabled: payload.enableRL,
    notes: payload.note
  };

  const { data } = await axios.post('/api/knowledge/reinforce', {
    signals,
    policyUpdate
  });
  return data;
}

function ReinforcementPanel({ reinforcement }: Props) {
  const queryClient = useQueryClient();
  const [reward, setReward] = useState<RewardForm>(initialReward);
  const mutation = useMutation({
    mutationFn: sendReinforcement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge'] });
      setReward(initialReward);
    }
  });

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-200">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">Reinforcement Engine</h2>
          <p className="text-xs text-slate-400">
            Turn feedback into tiny reward signals. Scores range from -1 (ouch) to 1 (amazing).
          </p>
        </div>
        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
          {reinforcement.enabled ? 'RL enabled' : 'RL on standby'}
        </span>
      </header>

      <form
        className="mt-3 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate(reward);
        }}
      >
        <div className="grid gap-2 md:grid-cols-3">
          {(['quality', 'speed', 'learning'] as const).map((metric) => (
            <label key={metric} className="space-y-1">
              <span className="text-xs uppercase tracking-wide text-slate-400">{metric}</span>
              <input
                type="range"
                min={-1}
                max={1}
                step={0.1}
                value={reward[metric]}
                onChange={(event) => setReward({ ...reward, [metric]: Number(event.target.value) })}
              />
              <span className="text-xs text-slate-500">Score: {reward[metric]}</span>
            </label>
          ))}
        </div>
        <label className="space-y-1">
          <span className="text-xs uppercase tracking-wide text-slate-400">What happened?</span>
          <textarea
            className="h-20 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            placeholder="Write a quick note about what worked or what needs improvement."
            value={reward.note}
            onChange={(event) => setReward({ ...reward, note: event.target.value })}
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-slate-400">
          <input
            type="checkbox"
            checked={reward.enableRL}
            onChange={(event) => setReward({ ...reward, enableRL: event.target.checked })}
          />
          Flip RL mode on for next sprint
        </label>
        <button className="w-full rounded-lg bg-accent px-3 py-2 font-semibold text-slate-900" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving feedback...' : 'Send reinforcement update'}
        </button>
      </form>

      <footer className="mt-4 space-y-1 text-xs text-slate-400">
        <p>Last RL update: {reinforcement.lastUpdate ? new Date(reinforcement.lastUpdate).toLocaleString() : 'Never'}</p>
        <details>
          <summary className="cursor-pointer text-primary">Policy notes</summary>
          <pre className="whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-[11px] text-slate-300">
            {reinforcement.policyNotes}
          </pre>
        </details>
      </footer>
    </section>
  );
}

export default ReinforcementPanel;
