import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import AuthConnector from './components/AuthConnector';
import SetupSteps from './components/SetupSteps';
import TaskBoard from './components/TaskBoard';
import ReinforcementPanel from './components/ReinforcementPanel';
import ResearchToggle from './components/ResearchToggle';

export type KnowledgeTask = {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  owner: string;
  notes: string;
};

export type KnowledgeBase = {
  projectName: string;
  vision: string;
  currentSprint: string;
  nextMilestone: string;
  reinforcement: {
    enabled: boolean;
    lastUpdate: string | null;
    policyNotes: string;
  };
  tasks: KnowledgeTask[];
};

async function fetchKnowledge() {
  const { data } = await axios.get<KnowledgeBase>('/api/knowledge');
  return data;
}

async function saveTask(task: KnowledgeTask) {
  const { data } = await axios.post<KnowledgeTask>('/api/knowledge/task', task);
  return data;
}

function App() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({ queryKey: ['knowledge'], queryFn: fetchKnowledge });
  const [deepResearch, setDeepResearch] = useState(false);

  const taskMutation = useMutation({
    mutationFn: saveTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['knowledge'] })
  });

  if (isLoading) {
    return <main className="p-8 text-xl">Loading project brain...</main>;
  }

  if (error || !data) {
    return (
      <main className="p-8 text-xl text-red-400">
        Something went wrong. Check that the backend server is running on port 4000.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <header className="bg-slate-950/80 border-b border-slate-800 sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">AlphaForge Control Center</h1>
            <p className="max-w-xl text-sm text-slate-300">
              Follow these guided steps to build the product. Every instruction is written so a determined 15-year-old can
              ship features and keep the team aligned with the architecture map.
            </p>
          </div>
          <AuthConnector />
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <SetupSteps knowledge={data} deepResearch={deepResearch} />
          <TaskBoard
            tasks={data.tasks}
            onSave={(task) =>
              taskMutation.mutate({
                ...task,
                notes: deepResearch ? `${task.notes}\nDeep research mode ON.` : task.notes
              })
            }
          />
        </div>
        <div className="space-y-6">
          <ResearchToggle enabled={deepResearch} onToggle={setDeepResearch} />
          <ReinforcementPanel reinforcement={data.reinforcement} />
          <article className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
            <h2 className="mb-2 text-lg font-semibold text-primary">Project Compass</h2>
            <p>
              Current Sprint: <strong>{data.currentSprint}</strong>
            </p>
            <p>
              Next Milestone: <strong>{data.nextMilestone}</strong>
            </p>
            <p className="mt-2">
              Golden knowledge base lives at <code className="text-accent">/knowledgebase/golden_knowledge.md</code>. Update it
              every time you learn something important.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;
