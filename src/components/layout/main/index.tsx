import type { ReactNode } from 'react';

interface MainProps {
  children?: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex h-full min-w-0 flex-col overflow-hidden bg-ide-editor">
      <section className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-ide-fg">Featured Content</h2>
      </section>
      <section className="max-h-50 flex-1 overflow-y-auto border-t border-ide-border p-6">
        {children || (
          <>
            <h2 className="mb-4 text-xl font-bold text-ide-fg">Additional Content</h2>
            <p className="text-ide-muted">Your content goes here</p>
          </>
        )}
      </section>
    </main>
  );
}
