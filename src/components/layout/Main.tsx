import { ReactNode } from 'react';

interface MainProps {
  children?: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex-1 flex flex-col">
      <section className="bg-green-500 flex-1 p-6 text-white">
        <h2 className="text-xl font-bold">Featured Content</h2>
      </section>
      <section className="bg-gray-200 flex-1 p-6 max-h-50">
        {children || (
          <>
            <h2 className="text-xl font-bold mb-4">Additional Content</h2>
            <p className="text-gray-700">Your content goes here</p>
          </>
        )}
      </section>
    </main>
  );
}
