import { useState } from 'react';
import type { KnowledgeTask } from '../App';

const statusOptions: KnowledgeTask['status'][] = ['todo', 'in-progress', 'done'];

type Props = {
  tasks: KnowledgeTask[];
  onSave: (task: KnowledgeTask) => void;
};

function TaskBoard({ tasks, onSave }: Props) {
  const [draft, setDraft] = useState<KnowledgeTask>({
    id: '',
    title: '',
    status: 'todo',
    owner: '',
    notes: ''
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.id) return;
    onSave(draft);
    setDraft({ id: '', title: '', status: 'todo', owner: '', notes: '' });
  }

  return (
    <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Task board</h2>
          <p className="text-sm text-slate-300">
            Each card describes a specialist mission. Keep language friendly and clear so teammates understand instantly.
          </p>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        {statusOptions.map((status) => (
          <div key={status} className="rounded-lg border border-slate-800 bg-slate-900/40 p-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">{status}</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <li key={task.id} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                    <h4 className="text-base font-semibold text-primary">{task.title}</h4>
                    <p className="text-xs text-slate-400">Owner: {task.owner || 'Unassigned'}</p>
                    <p className="mt-1 text-xs text-slate-300 whitespace-pre-wrap">{task.notes}</p>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-sm">
        <h3 className="text-lg font-semibold text-primary">Add or update a task</h3>
        <p className="text-xs text-slate-400">
          Tip: Use short IDs like <code>ui-auth</code> or <code>research-rl</code> so everyone can reference tasks quickly.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <span>ID</span>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              value={draft.id}
              onChange={(event) => setDraft({ ...draft, id: event.target.value })}
              placeholder="unique-task-id"
              required
            />
          </label>
          <label className="space-y-1">
            <span>Title</span>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              placeholder="Explain the mission"
              required
            />
          </label>
          <label className="space-y-1">
            <span>Owner</span>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              value={draft.owner}
              onChange={(event) => setDraft({ ...draft, owner: event.target.value })}
              placeholder="Who will lead?"
            />
          </label>
          <label className="space-y-1">
            <span>Status</span>
            <select
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              value={draft.status}
              onChange={(event) => setDraft({ ...draft, status: event.target.value as KnowledgeTask['status'] })}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="space-y-1">
          <span>Notes</span>
          <textarea
            className="h-24 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            value={draft.notes}
            onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
            placeholder="Describe the goal, success metrics, and helpful links."
          />
        </label>
        <button className="w-full rounded-lg bg-primary px-3 py-2 font-semibold text-slate-900">Save task</button>
      </form>
    </section>
  );
}

export default TaskBoard;
