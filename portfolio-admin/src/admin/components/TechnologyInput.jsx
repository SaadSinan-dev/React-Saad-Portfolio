import { useState } from 'react';

export default function TechnologyInput({ value, onChange, disabled }) {
  const [draft, setDraft] = useState('');

  const add = (rawValue) => {
    const tech = rawValue.trim();
    if (!tech) return;
    if (!value.some((item) => item.toLowerCase() === tech.toLowerCase())) {
      onChange([...value, tech]);
    }
    setDraft('');
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      add(draft);
    }
  };

  return (
    <div role="group" aria-label="Technologies">
      <div className="flex min-h-11 flex-wrap gap-2 border border-line-strong bg-base p-2 focus-within:border-ink">
        {value.map((tech) => (
          <span key={tech} className="inline-flex items-center gap-2 border border-line bg-surface px-2 py-1 text-xs text-ink">
            {tech}
            <button
              type="button"
              disabled={disabled}
              aria-label={`Remove ${tech}`}
              onClick={() => onChange(value.filter((item) => item !== tech))}
              className="text-faint hover:text-ink"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          disabled={disabled}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => add(draft)}
          aria-label="Add technology"
          placeholder={value.length ? 'Add another…' : 'React, Flutter, Supabase…'}
          className="min-w-[10rem] flex-1 bg-transparent px-1 py-1 text-sm placeholder:text-faint"
        />
      </div>
      <p className="mt-2 text-xs text-faint">Press Enter or comma to add a technology.</p>
    </div>
  );
}
