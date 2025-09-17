import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

type CollapseItemProps = {
  title: ReactNode;          // e.g., "DevOps Engineer · Acme"
  subtitle?: ReactNode;      // e.g., period with Calendar icon
  meta?: ReactNode;          // e.g., location text on the right
  children: ReactNode;       // collapsed content (bullets)
  defaultOpen?: boolean;
};

export function CollapseItem({
  title,
  subtitle,
  meta,
  children,
  defaultOpen = false,
}: CollapseItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = Math.random().toString(36).slice(2);

  return (
    <div className="rounded-xl border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900">
      <button
        className="w-full px-5 py-4 flex items-center justify-between gap-3"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={`panel-${id}`}
      >
        <div className="min-w-0 text-left">
          <h3 className="text-base md:text-lg font-semibold truncate">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {meta && (
            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">
              {meta}
            </span>
          )}
          <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* animated reveal using CSS grid trick */}
        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out
                      ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div id={`panel-${id}`} className="min-h-0 px-5 pb-5">
            {children}
          </div>
        </div>
    </div>
  );
}
