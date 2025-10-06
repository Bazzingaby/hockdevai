import type { KnowledgeBase } from '../App';

const steps = [
  {
    id: '1-understand',
    title: 'Understand the architecture',
    description:
      'Open the AlphaForge diagram from the repo root. Match each box with a feature in this app so you know how the system flows.'
  },
  {
    id: '2-install',
    title: 'Install and run the servers',
    description: 'Follow the startup checklist on the right. Keep notes if something breaks so you can improve it later.'
  },
  {
    id: '3-connect',
    title: 'Connect your accounts',
    description: 'Use the connectors above to log in with Google, GitHub, or a PAT token. Store secrets in .env files only.'
  },
  {
    id: '4-plan',
    title: 'Assign specialists',
    description:
      'Use the task board to assign designers, engineers, or researchers. Leave a note about what success looks like.'
  },
  {
    id: '5-learn',
    title: 'Run reinforcement feedback',
    description: 'Collect feedback, turn it into rewards, and feed it back into the system to improve the plan.'
  }
];

type Props = {
  knowledge: KnowledgeBase;
  deepResearch: boolean;
};

function SetupSteps({ knowledge, deepResearch }: Props) {
  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
        <h2 className="text-2xl font-semibold text-primary">Mission briefing</h2>
        <p className="text-sm text-slate-300">{knowledge.vision}</p>
        {deepResearch && (
          <p className="rounded-lg border border-accent/50 bg-accent/10 px-3 py-2 text-xs text-accent">
            Deep Research mode is ON. Capture discoveries in the golden knowledge base after each session.
          </p>
        )}
      </header>
      <ol className="grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <li key={step.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-200">
            <div className="flex items-start justify-between">
              <span className="text-xl font-bold text-accent">{step.id.split('-')[0]}</span>
              <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
                Starter Guide
              </span>
            </div>
            <h3 className="mt-2 text-lg font-semibold text-primary">{step.title}</h3>
            <p className="mt-2 text-slate-300">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default SetupSteps;
