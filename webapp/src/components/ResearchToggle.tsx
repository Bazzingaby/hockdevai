type Props = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

function ResearchToggle({ enabled, onToggle }: Props) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4 text-sm text-slate-200">
      <h2 className="text-lg font-semibold text-primary">Deep Research Mode</h2>
      <p className="mt-1 text-xs text-slate-400">
        Flip this on when you need to slow down, investigate, and improve a feature. The app will remind you to store findings
        in the golden knowledge base.
      </p>
      <label className="mt-3 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
        <span>{enabled ? 'Research mode is active' : 'Research mode is off'}</span>
        <input type="checkbox" checked={enabled} onChange={(event) => onToggle(event.target.checked)} />
      </label>
      {enabled && (
        <p className="mt-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-accent">
          Remember: create or update a task tagged with “research” and document your discoveries in the knowledge base file.
        </p>
      )}
    </section>
  );
}

export default ResearchToggle;
