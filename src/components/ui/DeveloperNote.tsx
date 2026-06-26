interface DeveloperNoteProps {
  tag: string;
  log: string;
  className?: string;
}

export function DeveloperNote({ tag, log, className = "" }: DeveloperNoteProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs ${className}`}>
      <div className="border-b border-slate-800 px-4 py-2 text-slate-500">{tag}</div>
      <pre className="overflow-x-auto p-4 leading-6 text-slate-300 whitespace-pre-wrap">{log}</pre>
    </div>
  );
}
